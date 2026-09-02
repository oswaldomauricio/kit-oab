import React, { useState, useEffect, useRef, useCallback } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, AlertTriangle, RotateCcw, Trophy, Target, ArrowLeft, ListChecks, Hash } from "lucide-react";
import { Link } from "react-router-dom";

// ──────────────────────────────────────────────
// DADOS DA PROVA
// ──────────────────────────────────────────────
const provaData = {
  prova: {
    nome: "Simulado Kit OAB — XIV, 40º, 42º e 43º Exames",
    tipo: 1,
    cor: "Branca",
    data: "2025-04-27",
    total_questoes: 141,
    observacao_gabarito: "Questões dos XIV, 40º, 42º e 43º Exames de Ordem Unificado. '*' indica questão anulada."
  },
  questoes: [
    {
      numero: 1,
      enunciado: "O advogado Antônio comenta em matérias veiculadas em página da internet, consistente em sítio eletrônico especializado em publicar artigos acadêmicos e jurídicos, novas leis que são sancionadas e faz explicações de fácil compreensão de conceitos e normas jurídicas. De acordo com o disposto no Código de Ética e Disciplina da OAB, assinale a afirmativa correta.",
      alternativas: {
        A: "É autorizado que Antônio responda às consultas jurídicas com habitualidade na página mencionada para promoção pessoal.",
        B: "É vedado que Antônio mencione seu e-mail e telefone na mencionada página, assim como o nome do escritório onde trabalha.",
        C: "Antônio não poderá fornecer, nas matérias que publica, seus meios de contato, tais como endereço e telefone, mas é permitida a referência a e-mail.",
        D: "Não é vedado que Antônio, ao comentar a atuação de colegas advogados em tais feitos, cite casos emblemáticos para a explicação de tais normas e conceitos."
      },
      gabarito: null,
      anulada: true
    },
    {
      numero: 2,
      enunciado: "Paulo Afrânio foi representado ao Tribunal de Ética e Disciplina do Conselho Seccional do Estado Alfa pela prática da infração disciplinar de violar, sem justa causa, sigilo profissional. Com o recebimento da representação, o Presidente designou relator, a quem competiu instruir o processo e oferecer parecer preliminar submetido ao Tribunal de Ética e Disciplina. Por se tratar de infração leve, o relator dispensou as etapas de defesa prévia e razões finais, garantindo ao representado apenas a defesa oral. Ao final, o relator ofereceu parecer preliminar no sentido da aplicação da pena de censura, submetido ao Tribunal de Ética e Disciplina que, acolhendo a proposta, aplicou a referida sanção ao advogado Paulo Afrânio. Sobre o processo disciplinar no âmbito da OAB, assinale a afirmativa correta.",
      alternativas: {
        A: "O procedimento adotado pelo relator foi correto, porque a legislação prevê que a defesa oral, por ser mais ampla e contundente, substitui a etapa de defesa prévia e a apresentação de razões finais.",
        B: "Nos casos de parecer preliminar do relator recomendando a aplicação de pena de censura, o Presidente do Conselho Seccional pode, desde logo, diante da baixa gravidade da pena aplicada, homologar o parecer, aplicando essa sanção.",
        C: "A condução do processo disciplinar pelo relator foi ilegal, porque a gravidade da infração ou da sanção aplicada não autorizam que sejam reduzidas as oportunidades de defesa do representado ou que se atropelem etapas do processo disciplinar.",
        D: "Não houve violação da ampla defesa do advogado, porque o reconhecimento de nulidades processuais está sujeito à constatação de efetivo prejuízo e, como no caso foi aplicada apenas pena de censura, não ocorreu dano suficiente a ponto de que se reconhecesse a ilegalidade do procedimento."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 3,
      enunciado: "João Pedro, destacado aluno do último semestre do curso de Direito, logrou êxito no Exame da Ordem dos Advogados do Brasil, sendo então convidado a integrar, assim que formado, uma renomada sociedade de advogados da sua cidade. Apesar de ter ficado honrado com o convite, João Pedro está em dúvida, pois em seus estudos para o Exame da OAB verificou ser possível constituir sociedade unipessoal de advocacia, opção que lhe pareceu mais atrativa. Considerando o enunciado, assinale a afirmativa correta.",
      alternativas: {
        A: "A sociedade unipessoal de advocacia de João Pedro poderá ter como sede, filial ou local de trabalho, um espaço de uso individual ou compartilhado com outros escritórios de advocacia ou empresas, desde que respeitadas as hipóteses de sigilo previstas na legislação.",
        B: "João Pedro poderá integrar a sociedade de advogados e, simultaneamente, constituir uma sociedade unipessoal de advocacia, ambas com sede ou filial na mesma área territorial do respectivo Conselho Seccional.",
        C: "João Pedro poderá escolher livremente a denominação da sociedade unipessoal de advocacia que vier a constituir, desde que complemente com a expressão \"Sociedade Individual de Advocacia\".",
        D: "A sociedade unipessoal de advocacia de João Pedro adquirirá personalidade jurídica com o registro aprovado dos seus atos constitutivos no Conselho Federal da OAB."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 4,
      enunciado: "Roberto, advogado criminalista, foi contratado para promover a defesa de Juvenal, gestor público acusado da prática de corrupção passiva, peculato e \"lavagem\" ou ocultação de valores. No decorrer do processo criminal, foi decretado, pelo Juízo, o bloqueio universal do patrimônio de Juvenal, visando ao ressarcimento do suposto dano causado ao erário, o que inviabilizou o adimplemento dos honorários contratuais devidos a Roberto e o reembolso de gastos com a defesa. Sobre essa hipótese, assinale a afirmativa correta.",
      alternativas: {
        A: "Roberto terá direito à liberação de até 20% dos bens bloqueados para fins de recebimento de honorários e o reembolso de gastos com a defesa.",
        B: "Roberto deverá solicitar, nos próprios autos da ação penal, a liberação de até 20% dos bens bloqueados, exclusivamente para o reembolso de gastos com a defesa.",
        C: "Em virtude da supremacia do interesse público, Roberto não fará jus à liberação de qualquer valor tornado indisponível, até que sobrevenha eventual decisão promovendo o desbloqueio do patrimônio de Juvenal.",
        D: "Em virtude do caráter alimentar dos honorários advocatícios, caso apresente o respectivo contrato nos autos, Roberto fará jus à liberação dos bens bloqueados até a completa satisfação da verba contratada, ainda que isso implique o esvaziamento do bloqueio judicial."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 5,
      enunciado: "Pedro, advogado regularmente inscrito na OAB, foi eleito Deputado Federal e deseja continuar exercendo a advocacia, patrocinando causas contra a Caixa Econômica Federal. Ele também cogita a possibilidade de concorrer ao cargo de Presidente da Câmara dos Deputados. Com base nas disposições do Estatuto da OAB, assinale a afirmativa correta sobre a possibilidade de Pedro continuar advogando.",
      alternativas: {
        A: "Caso Pedro seja eleito Presidente da Câmara dos Deputados, ele ficará impedido de atuar em causas contra a Caixa Econômica Federal, mas poderá advogar em causas particulares.",
        B: "Pedro, na condição de Deputado Federal, poderá advogar contra a Caixa Econômica Federal, desde que seja em causa própria, tendo em vista que o impedimento se aplica apenas a causas de terceiros.",
        C: "Como Deputado Federal, Pedro está impedido de exercer a advocacia contra a Caixa Econômica Federal, mas pode atuar em causas que não envolvam entes públicos ou concessionárias de serviço público.",
        D: "Pedro, como Deputado Federal, estará em situação de incompatibilidade total com o exercício da advocacia e não poderá atuar como advogado em nenhuma causa, mesmo em processos particulares."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 6,
      enunciado: "Afonso, condenado por tráfico de drogas, cumpre pena dividindo cela com Rodrigo, preso preventivamente há mais de dois anos, sem que a instrução do processo por roubo a que responde tenha sido concluída. Indignado com a situação de Rodrigo, Afonso, que não tem formação jurídica, mas sempre foi habilidoso com a escrita, decide redigir um pedido de habeas corpus em folha de caderno, à mão, em favor de seu companheiro de cela. Considerando o disposto no Estatuto da Ordem dos Advogados do Brasil (EOAB), assinale a afirmativa correta.",
      alternativas: {
        A: "A impetração de habeas corpus é atividade privativa de advogado regularmente inscrito na OAB, não podendo ser realizada por um leigo, ainda que em defesa de direitos fundamentais.",
        B: "Afonso poderá redigir e impetrar o habeas corpus em favor de Rodrigo, pois a impetração desse remédio constitucional não está incluída entre as atividades privativas da advocacia.",
        C: "Afonso somente poderia impetrar o habeas corpus se comprovasse que não havia advogado disponível para atuar no caso de Rodrigo.",
        D: "A impetração de habeas corpus é vedada para leigos quando se trata de crimes graves, como roubo, exigindo obrigatoriamente a atuação de advogado."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 7,
      enunciado: "Aurélio, advogado regularmente inscrito na OAB, recebeu uma ligação urgente da família de Adalberto, seu amigo de infância, informando que este havia sido preso em flagrante, acusado da prática de homicídio. Preocupado com a situação, Aurélio dirigiu-se à Delegacia de Polícia para conversar com Adalberto e prestar-lhe assistência jurídica. No entanto, o Delegado Moisés negou o pedido de Aurélio para se comunicar pessoal e reservadamente com Adalberto, justificando a negativa pela gravidade do crime e pela ausência de procuração formal outorgada ao advogado. Sobre a hipótese narrada, com base no Estatuto da OAB, assinale a afirmativa correta.",
      alternativas: {
        A: "A negativa do Delegado foi legítima, uma vez que, em razão da gravidade do crime de homicídio, é admissível limitar a comunicação do advogado com o preso.",
        B: "A comunicação de Aurélio com Adalberto só poderia ocorrer mediante a apresentação de procuração assinada, conforme exigido para a assistência jurídica em casos graves.",
        C: "A atuação de Aurélio é ilegal, pois a advocacia em favor de amigos próximos caracteriza conflito ético-profissional que inviabiliza a assistência jurídica.",
        D: "A negativa do Delegado foi ilegal, pois Aurélio tem direito de comunicar-se pessoal e reservadamente com Adalberto, mesmo sem procuração, conforme previsto no Estatuto da OAB."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 8,
      enunciado: "Antônio, advogado experiente e com extensa carteira de clientes, decidiu fazer uso de instrumentos de inteligência artificial generativa para auxiliá-lo na elaboração de peças processuais. Apesar da revisão posterior, com assessoramento de seu estagiário, dos textos produzidos pela nova tecnologia, determinado Magistrado notifica-o para prestar esclarecimentos acerca de recurso interposto de forma manifestamente incabível. Ao ler a peça, Antônio identifica que foram citadas doutrina e jurisprudência de forma deturpada, em situação que poderia confundir o adversário ou iludir o Juiz da causa. Sobre esse contexto, de acordo com o Estatuto da Ordem dos Advogados do Brasil, assinale a afirmativa correta.",
      alternativas: {
        A: "Por não ter agido de forma dolosa, Antônio não poderá sofrer qualquer sanção disciplinar, uma vez que o advogado não é responsável pelos atos praticados com culpa.",
        B: "Em razão da gravidade da situação, após o devido processo disciplinar, Antônio poderá ser apenado com a suspensão do exercício da advocacia por período que poderá variar de 30 dias a 12 meses.",
        C: "A Antônio poderá ser aplicada a pena de censura, a qual pode ser convertida em advertência, em ofício reservado, sem registro nos seus assentamentos, quando estiver presente circunstância atenuante.",
        D: "Caso se trate de situação reincidente, Antônio poderá ser apenado com a sanção de exclusão, devendo ser cancelada sua inscrição na Ordem dos Advogados do Brasil."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 9,
      enunciado: "Entre as diferentes correntes do positivismo jurídico, a Escola da Exegese destacou-se, sobretudo, por seus estudos em torno do Código de Napoleão. O jusfilósofo Miguel Reale, em seu livro Filosofia do Direito, afirma que, segundo essa escola, a evolução do Direito somente poderia se operar por meio do processo legislativo. Assinale a opção que, de acordo com Reale no livro em referência, apresenta a tese fundamental da Escola da Exegese.",
      alternativas: {
        A: "É a exegese da constituição que pode oferecer aos juristas a compreensão do ideal de justiça, que vincula e limita a liberdade de conformação legislativa da autoridade política.",
        B: "O Direito, por excelência, é revelado pelas leis, que são normas gerais escritas e emanadas pelo Estado, constitutivas de direito e instauradoras de faculdades e obrigações.",
        C: "A lei é o instrumento que revela os valores e princípios que são logicamente anteriores e eticamente superiores ao Estado e que conformam e estruturam o direito positivo.",
        D: "A interpretação da lei é a atividade essencial do jurista, que deve realizá-la buscando a vontade da lei em si, seus fins sociais e as exigências do bem comum, de modo a assegurar a própria evolução do direito."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 10,
      enunciado: "Segundo Kant, em seu livro Fundamentação da Metafísica dos Costumes, cada indivíduo, como ser moral, possui uma dignidade que lhe é própria. Assinale a afirmativa que, segundo Kant, no livro em referência, mostra como a dignidade deve ser entendida.",
      alternativas: {
        A: "Como o conjunto dos direitos fundamentais que devem ser assegurados pelo Estado e que permitem a cada indivíduo o exercício de sua plena cidadania.",
        B: "Como o valor moral da humanidade que, por isso mesmo, deve ser sempre posto em cálculo ou confronto com qualquer coisa que possua um preço, a fim de se verificar o que deve prevalecer.",
        C: "Como o valor do trabalho livre de uma pessoa no processo de transformação da natureza em bens de consumo úteis à existência e ao desenvolvimento econômico e moral da sociedade.",
        D: "Como aquilo que não possui um preço – valor relativo –, mas um valor íntimo, ou seja, uma condição graças à qual algo deve ser considerado um fim em si mesmo."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 11,
      enunciado: "O Presidente da República, por ter alegadamente atuado com o intuito de beneficiar pessoas de seu círculo de amizades pessoais, é acusado de influir diretamente no resultado de uma grande licitação, cujo procedimento ocorreu em órgão do Ministério X. Enzo, francês nato e naturalizado brasileiro, com candidatura deferida para disputar a eleição para vereador no Município em que reside, resolve consultá-lo(a), como advogado(a), para saber se ele poderia ajuizar uma ação constitucional para anular a referida licitação e para preservar a intangibilidade do patrimônio público, bem como a integridade do princípio da moralidade administrativa. Analisando a narrativa à luz do sistema jurídico-constitucional, assinale a afirmativa que apresenta, corretamente, a solução para o caso em tela.",
      alternativas: {
        A: "Enzo, por ser francês nato, não tem legitimidade ativa para ajuizar ação constitucional com o objetivo almejado, mas pode impetrar um mandado de segurança perante o Superior Tribunal de Justiça para sustar a eficácia do ato.",
        B: "Enzo, na qualidade de cidadão brasileiro, pode ajuizar uma ação popular perante o Supremo Tribunal Federal.",
        C: "Enzo, no exercício de direito fundamental, pode ajuizar uma ação civil pública com o objetivo de proteger o interesse difuso de uma Administração Pública proba.",
        D: "Enzo, por ser naturalizado brasileiro e ostentar a qualidade de cidadão, pode ajuizar uma ação popular perante o Juízo competente de primeiro grau."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 12,
      enunciado: "João, pessoa com deficiência, beneficiária de pensão alimentícia devida pelo Estado Beta, ingressou com ação judicial para receber valores atrasados. Após desfecho favorável a João, o Poder Judiciário determinou que o pagamento dos débitos alimentares em precatórios seja efetuado, de acordo com a ordem cronológica de apresentação, sem estabelecer qualquer prioridade para João. Com base na situação descrita e no sistema jurídico-constitucional brasileiro, assinale a opção que apresenta, corretamente, o esclarecimento que você, como advogado(a), daria a João.",
      alternativas: {
        A: "João, por ser pessoa com deficiência, tem preferência no recebimento de precatórios referentes a débitos alimentares, independentemente do montante dos valores devidos.",
        B: "As pessoas com deficiência, como João, tal como outras classes de pessoas, têm preferência no recebimento de precatórios referentes a débitos alimentares, observados os balizamentos estabelecidos pela ordem jurídica.",
        C: "A pessoa com deficiência tem preferência absoluta, em relação a qualquer outro credor, no recebimento de precatórios e dívidas de pequeno valor, somente em casos de débitos alimentares de até cinco salários mínimos.",
        D: "A preferência no recebimento de precatórios não se aplica a débitos alimentares, mesmo que se trate de pessoa com deficiência, considerando que todos os credores têm a mesma necessidade vital."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 13,
      enunciado: "Em razão de fenômenos climáticos que vêm ocorrendo de forma reiterada nos últimos anos, os Estados de determinada região do país vêm sofrendo grandes perdas econômicas, o que acentua o desequilíbrio socioeconômico em relação às demais regiões do país. Por haver no plano federal o entendimento de serem necessárias medidas que incentivem as atividades econômicas da região prejudicada, surgiu a proposta para que bancos estatais concedessem juros favorecidos para financiar atividades consideradas prioritárias para a região. A essa proposta se opôs o Governador do Estado Beta, que, entendendo haver inconstitucionalidade nela, solicitou aconselhamento jurídico ao seu corpo de advogados. Sobre a hipótese, segundo a perspectiva jurídico-constitucional brasileira, assinale a opção que apresenta, corretamente, a orientação recebida.",
      alternativas: {
        A: "O governador do Estado Beta está correto, em razão da violação ao princípio da igualdade de tratamento entre as regiões de um Estado Federal.",
        B: "A medida encontra respaldo constitucional por ser o combate às desigualdades regionais um objetivo fundamental da República.",
        C: "A proposta de bancos estatais oferecerem juros favorecidos afronta a ordem constitucional, mesmo que seja lícito combater as desigualdades regionais.",
        D: "O combate às desigualdades regionais não configura tema de índole constitucional, sendo seu enfrentamento delineado pela via legal, conforme a opção política do legislador."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 14,
      enunciado: "A Comissão Parlamentar Permanente da Câmara dos Deputados convocou um Ministro de Estado para prestar esclarecimentos sobre um episódio ocorrido em sua pasta. O Ministro consultou você, na condição de profissional designado(a) para prestar assessoria jurídica à pasta, se ele deveria mesmo ir, já que não se tratava de uma Comissão Parlamentar de Inquérito (CPI), que possuiria poderes de investigação próprios das autoridades judiciais. Com base na situação descrita e no sistema jurídico-constitucional brasileiro de 1988, assinale a afirmativa correta.",
      alternativas: {
        A: "O Ministro de Estado deve comparecer, mesmo não se tratando de uma convocação realizada por CPI, pois a Comissão Parlamentar Permanente da Câmara dos Deputados tem, de acordo com a CRFB/88, competência para convocá-lo.",
        B: "A CRFB/88 estabelece que o Ministro de Estado, como autoridade do Poder Executivo Federal, não pode ser convocado para prestar esclarecimentos à Comissão Parlamentar Permanente, sob pena de afronta ao princípio da separação dos Poderes.",
        C: "Assiste razão ao Ministro de Estado, porque, para prestar esclarecimentos a respeito de episódio ocorrido em sua pasta, ele só pode ser convocado por CPI, que possui poderes próprios das autoridades judiciais, incluindo o de tomar depoimentos de autoridades.",
        D: "Como o Ministro de Estado goza das mesmas imunidades do Presidente da República, já que atua por delegação desse último agente, não pode ser convocado por Comissão Parlamentar Permanente para prestar esclarecimentos sobre episódio ocorrido em sua pasta."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 15,
      enunciado: "Durante um violento temporal, em que as chuvas torrenciais poderiam levar ao desabamento de uma casa, os bombeiros militares ingressaram em um domicílio, sem o consentimento do morador, à noite, para socorrer as pessoas que estavam no imóvel. Posteriormente, o morador propôs ação indenizatória por danos morais em face do ente federativo ao qual os bombeiros militares estavam vinculados, argumentando que o referido ingresso fora ilícito. Sobre a hipótese narrada, com base no sistema constitucional brasileiro, assinale a afirmativa correta.",
      alternativas: {
        A: "A medida adotada pelos bombeiros militares, a despeito da boa intenção deles, foi incorreta, pois o domicílio é inviolável, o que pressupõe a autorização do morador para que pudessem ingressar no local e prestar socorro.",
        B: "A ação indenizatória não prosperará, pois os bombeiros militares, diante do desastre iminente, não precisam de consentimento do morador do imóvel para prestar socorro.",
        C: "A despeito do direito à inviolabilidade do domicílio não ser absoluto, o consentimento do morador somente pode ser dispensado por determinação judicial, logo a ação dos bombeiros foi ilícita.",
        D: "Houve desproporcionalidade na atuação dos agentes, o que permite a condenação do ente federativo na ação indenizatória, visto que a prestação de socorro, sem consentimento do morador, só pode ocorrer durante o dia."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 16,
      enunciado: "O Presidente da República emitiu decreto autônomo, disciplinando a organização e o funcionamento da Administração Federal. O Senador da República Joelson Cruz, Presidente do Partido Político Beta, entende que esse decreto viola a Constituição da República, além de contrariar o interesse público. Por essa razão, pretende que o seu Partido ajuíze uma ação, pela via do controle concentrado de constitucionalidade, contra o ato presidencial. Todavia, por não ter formação jurídica, procura os advogados do Partido Político Beta, a fim de que lhe instruam sobre a melhor maneira de concretizar o seu intento. Diante disso, considerando o que estabelece o sistema jurídico-constitucional brasileiro, os advogados informaram, corretamente, que o decreto autônomo",
      alternativas: {
        A: "deve ser atacado com o ajuizamento de ação popular, por se tratar de ato do Poder Executivo e em razão dos objetivos desejados pelo Senador Joelson Cruz.",
        B: "não se submete ao controle concentrado de constitucionalidade, pois esse tipo de diploma não possui natureza normativa, apresentando natureza mandamental.",
        C: "pode ser objeto de ação direta de inconstitucionalidade, por ser um diploma normativo que busca seu fundamento de validade diretamente na Constituição da República.",
        D: "só pode ser objeto de apreciação por meio de arguição de descumprimento de preceito fundamental, pois esse é o instrumento adequado para impugnar atos administrativos do Poder Executivo."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 17,
      enunciado: "Na condição de advogado(a), você é procurado(a) por uma Organização não Governamental que atua na defesa e proteção dos Direitos Humanos de grupos minoritários no Brasil. A entidade solicita esclarecimentos quanto aos mecanismos de que dispõe para levar ao conhecimento das instâncias competentes, no âmbito do sistema global de proteção dos Direitos Humanos, uma situação que entende violar a Convenção para a Prevenção e a Repressão do Crime de Genocídio, com o objetivo de responsabilizar o Estado brasileiro. Nesse contexto, você deve esclarecer que, para a obtenção da finalidade pretendida, dentre os mecanismos existentes em nível global, as Organizações não Governamentais podem submeter o caso em questão diretamente à apreciação",
      alternativas: {
        A: "da Corte Internacional de Justiça.",
        B: "do Tribunal Penal Internacional.",
        C: "do Conselho de Direitos Humanos das Nações Unidas.",
        D: "do Alto Comissariado das Nações Unidas para os Direitos Humanos."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 18,
      enunciado: "Na condição de advogado(a), você foi procurado por um grupo de mães de crianças entre 6 e 10 anos que tentaram, sem sucesso, matricular seus filhos na rede básica de ensino. Elas alegam que já envidaram todos os esforços no âmbito administrativo, sendo-lhes sempre apresentada a justificativa da inexistência de vagas. Considerando a situação hipotética em questão, assinale a afirmativa correta.",
      alternativas: {
        A: "Caso seja demonstrada a inércia do Estado em prover o efetivo acesso ao ensino de primeiro grau, comprovando-se ainda que a situação foi devidamente submetida ao crivo do Poder Judiciário local, esgotados todos os recursos cabíveis, frustrada a obtenção de tutela eficaz, o caso poderá ser submetido diretamente pelas vítimas à análise da Comissão Interamericana de Direitos Humanos.",
        B: "De acordo com a interpretação fixada pelo Supremo Tribunal Federal em relação ao direito à educação, em razão do seu desenvolvimento progressivo, não se pode configurá-lo como típico direito subjetivo, cujo efetiva implementação possa ser determinada por decisão judicial.",
        C: "Apesar de o direito à educação, em razão da sua natureza social, estar previsto no Protocolo Adicional de São Salvador, no âmbito do Sistema Regional Americano de Proteção dos Direitos Humanos foram previstos meios próprios para sua proteção, não sendo possível a utilização do sistema de petições individuais regulado pela Convenção Americana sobre Direitos Humanos.",
        D: "Em razão de o Brasil não ter ratificado o Protocolo Adicional de São Salvador, o caso em questão não poderá ser submetido aos órgãos integrantes do Sistema Regional Americano de Proteção dos Direitos Humanos."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 19,
      enunciado: "Maria estava concorrendo ao cargo de Governadora do Estado Alfa. No decorrer da campanha, obteve prova documental e testemunhal de que Joana, sua adversária direta na disputa, praticara abuso do poder econômico. Por essa razão, solicitou a você, como advogado(a), que a representasse à Justiça Eleitoral para a abertura de investigação judicial eleitoral. Assinale a opção que indica, corretamente, a quem deve ser encaminhada a petição.",
      alternativas: {
        A: "A um dos Juízes Eleitorais em atuação no Estado Alfa.",
        B: "Ao Presidente do Tribunal Regional Eleitoral, que deve apreciar os fatos.",
        C: "À livre distribuição do Tribunal Regional Eleitoral, que deve apreciar os fatos.",
        D: "Ao Corregedor Regional do Tribunal Regional Eleitoral, que deve apreciar os fatos."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 20,
      enunciado: "No curso da campanha eleitoral, João, candidato ao cargo de Prefeito Municipal, doou três sacos de cimento a Pedro, sob o compromisso de que este nele votaria. Ao tomar conhecimento dos fatos, Ana, candidata ao mesmo cargo, procurou você, como advogado(a), e solicitou que fosse ajuizada a ação cabível, de modo que o registro ou o diploma de João fosse cassado. Assinale a opção que indica, corretamente, a ação cabível no caso.",
      alternativas: {
        A: "Ação de impugnação do registro, que pode ser ajuizada até a data da eleição.",
        B: "Recurso contra a expedição de diploma, que pode ser ajuizada até três dias após a diplomação.",
        C: "Ação penal por ato de corrupção eleitoral, que pode ser ajuizada até fluir o prazo prescricional.",
        D: "Representação por captação ilícita de sufrágio, que pode ser ajuizada até a data da diplomação."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 21,
      enunciado: "Uma artista brasileira, que protagoniza filmes nos Estados Unidos, foi filmada em uma casa de festas no Brasil em estado de embriaguez e o vídeo foi postado por um portal de notícias americano. O vídeo \"viralizou\" e teve grande repercussão no Brasil. Com receio de prejudicar sua carreira com a exposição negativa de sua imagem, ela decidiu ajuizar uma ação no Brasil contra o portal de notícias, que tem sua sede nos Estados Unidos. Nesse cenário, com base nos limites da jurisdição nacional estabelecidos no Código de Processo Civil, assinale a afirmativa correta.",
      alternativas: {
        A: "A autoridade judiciária brasileira não é competente para julgar a ação, porque o réu é pessoa jurídica estrangeira.",
        B: "A autoridade judiciária brasileira é competente para julgar a ação, porque a autora tem nacionalidade brasileira.",
        C: "A autoridade judiciária brasileira tem competência para processar e julgar a ação, porque os danos à imagem ocorreram no Brasil.",
        D: "A autoridade brasileira deve remeter o caso, por carta rogatória, à justiça norte-americana, tendo em vista que o portal de notícias é sediado nos Estados Unidos."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 22,
      enunciado: "A cooperação jurídica internacional é uma modalidade formal de solicitar a outro país uma medida judicial, investigativa ou administrativa para um caso concreto. Esforçando-se para facilitar a cooperação jurídica nos casos de litígios e disputas internacionais, o Brasil aderiu à Convenção da Haia sobre a Obtenção de Provas no Estrangeiro em Matéria Civil ou Comercial (Convenção da Haia sobre Provas), promulgada pelo Decreto nº 9.039, de 27 de abril de 2017. Sobre a obtenção de provas no exterior, assinale a afirmativa correta.",
      alternativas: {
        A: "A tramitação do pedido de cooperação jurídica internacional para a obtenção de prova no exterior apenas poderá ser feita com base em acordo internacional vigente entre o Brasil e o Estado Requerido.",
        B: "A Convenção da Haia sobre a Obtenção de Provas no Estrangeiro em matéria civil e comercial prevê que a autoridade judicial deve aplicar integralmente a legislação do Estado Requerente no que diz respeito às formalidades a serem seguidas na obtenção da prova.",
        C: "O cumprimento da Carta Rogatória em que se requer à autoridade competente de um Estado Contratante a obtenção de provas só poderá ser recusado quando, no Estado Requerido, o cumprimento não estiver no âmbito das atribuições do Poder Judiciário ou quando o Estado Requerido considerá-lo prejudicial à sua soberania ou segurança.",
        D: "Cada Estado Contratante designará uma Autoridade Central para receber as Cartas Rogatórias procedentes de autoridade judiciária de outro Estado Contratante e de transmiti-las à autoridade competente para cumprimento. A organização dessa Autoridade Central deve ser a mesma em todos os Estados signatários da Convenção da Haia sobre Provas, sem a possibilidade de cada um legislar sobre essa organização."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 23,
      enunciado: "O Estado Beta, no último ano, ultrapassou o limite de despesa total de pessoal, que, segundo a Lei de Responsabilidade Fiscal (LRF), é de, no máximo, 60% da Receita Corrente Líquida (RCL). Por falta de gestão responsável, apesar de os demais Poderes e órgãos autônomos terem se enquadrado dentro dos respectivos percentuais fixados como limites individuais, o Poder Executivo Estadual ainda não conseguiu alcançar a redução determinada pela própria LRF, dentro do prazo por ela estipulado, para atender ao percentual máximo de 49% da RCL, fixado como limite individual de despesas com pessoal para o Poder Executivo Estadual. Diante desse cenário, à luz da Lei de Responsabilidade Fiscal, o Poder Executivo estadual não poderá",
      alternativas: {
        A: "realizar qualquer operação de crédito, apenas.",
        B: "receber transferências voluntárias (exceto nas áreas de educação, saúde e assistência social), mas poderá obter garantia de outro ente, bem como poderá contratar operações de crédito.",
        C: "obter garantia de outro ente, nem contratar operações de crédito, ressalvadas as que visem à redução das despesas com pessoal, mas poderá receber transferências voluntárias em quaisquer áreas.",
        D: "receber transferências voluntárias (exceto nas áreas de educação, saúde e assistência social), nem obter garantia de outro ente, nem contratar operações de crédito, ressalvadas as destinadas ao pagamento da dívida mobiliária e as que visem à redução das despesas com pessoal."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 24,
      enunciado: "O projeto da Lei Orçamentária Anual (LOA) de determinado ente federativo, encaminhado ao Poder Legislativo pelo Poder Executivo, prevê apenas o orçamento fiscal do referido ente. Na mensagem de encaminhamento do projeto de LOA, está esclarecido que o orçamento de investimentos das empresas em que o ente, direta ou indiretamente, detenha a maioria do capital social com direito a voto, bem como o orçamento da seguridade social do ente, será encaminhado individualmente por meio de outros projetos. Diante desse cenário, sobre esse procedimento assinale a afirmativa correta.",
      alternativas: {
        A: "Viola a regra constitucional de que o orçamento da seguridade social deve integrar a Lei de Diretrizes Orçamentárias.",
        B: "Não atende à regra constitucional de que a LOA compreenderá também o orçamento de investimentos e o orçamento da seguridade social.",
        C: "Está correto, pois apenas o orçamento fiscal compõe a LOA, devendo o orçamento de investimento e o orçamento da seguridade social serem previstos em leis próprias para cada um desses tipos de orçamentos.",
        D: "É inadequado em relação ao orçamento de investimentos, que deveria compor a LOA, mas é admitido em relação ao orçamento da seguridade social, que pode ser previsto em outra lei, desde que seu valor global esteja previsto na LOA."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 25,
      enunciado: "João da Silva, profissional liberal, foi notificado pela Administração Tributária Federal, em 20 de janeiro de 2023, para prestar esclarecimentos sobre possíveis rendimentos não declarados recebidos no ano de 2019. Tais rendimentos foram identificados por meio de movimentação financeira de sua conta bancária, a partir da Lei Complementar Federal nº XXX/2022, publicada em 15 de dezembro de 2022, que alterou os critérios de fiscalização, ampliando os poderes de investigação do Fisco Federal, permitindo a este acesso aos dados financeiros bancários dos contribuintes (apenas créditos e débitos) para fins de fiscalização, lançamento tributário e cobrança de Imposto sobre a Renda. Irresignado com a notificação relativa aos fatos ocorridos vários anos atrás, João consulta seu(sua) advogado(a), que emite um sucinto parecer e uma orientação jurídica. Diante desse cenário e de acordo com o Código Tributário Nacional (CTN), assinale a afirmativa correta.",
      alternativas: {
        A: "A notificação é inconstitucional por violar o princípio da irretroatividade tributária, uma vez que a referida nova lei só poderia produzir efeitos a partir da sua publicação.",
        B: "Por não ter respeitado a anterioridade nonagesimal, que imporia a vigência e eficácia daquela nova lei somente a partir do meio do mês de março de 2023, a notificação é indevida.",
        C: "A notificação é regular e atende às regras constitucionais e às do CTN, devendo João da Silva prestar os esclarecimentos quanto aos rendimentos recebidos e, se for o caso, recolher o imposto devido com os acréscimos devidos.",
        D: "Não poderá ocorrer lançamento tributário fundado em dados obtidos a partir de fiscalização com base na Lei Complementar nº XXX/2022, já que ela instituiu novos critérios de apuração ou processos de fiscalização depois da ocorrência do fato gerador da obrigação."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 26,
      enunciado: "Um contrato de locação residencial traz cláusula expressa de que ao locatário caberá o encargo de pagar diretamente, para o Município ou a rede bancária, o IPTU incidente sobre o imóvel locado, enquanto durar o contrato de locação, devendo remeter, posteriormente, o comprovante de pagamento ao locador. Sobre a posição do locatário, à luz do Código Tributário Nacional, assinale a afirmativa correta.",
      alternativas: {
        A: "O locatário pode ser considerado contribuinte de direito quanto a este IPTU.",
        B: "Em caso de inadimplemento deste IPTU, o locatário não poderá ser executado pelo Município.",
        C: "Quanto a este IPTU, o locatário tem responsabilidade tributária por substituição ao locador.",
        D: "O locatário é responsável tributário por sucessão do locador quanto a este IPTU."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 27,
      enunciado: "Visando à melhoria do serviço de iluminação pública e da segurança no Município Alfa, foi publicada lei municipal, em 20/02/2024, instituindo uma contribuição cuja arrecadação estaria vinculada ao custeio, à expansão e à melhoria do serviço de iluminação pública e de sistemas de monitoramento para a segurança e a preservação de logradouros públicos. Acerca desta lei, assinale a afirmativa correta.",
      alternativas: {
        A: "A contribuição poderia ser instituída e vinculada a todas essas finalidades, por expressa previsão constitucional.",
        B: "É inconstitucional a tentativa de custear a iluminação pública por espécie tributária distinta de impostos.",
        C: "A implantação de sistemas de monitoramento para a segurança e a preservação de logradouros públicos somente poderia ser custeada com recursos advindos de taxas, e não de uma contribuição.",
        D: "A implantação de sistemas de monitoramento para a segurança e a preservação de logradouros públicos somente poderia ser custeada com recursos advindos de impostos, e não de uma contribuição."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 28,
      enunciado: "Nova lei federal ordinária, pretendendo oferecer uma oportunidade para que os empregadores possam quitar suas dívidas de contribuição previdenciária patronal, criou um programa de parcelamento de dívidas desse tributo em até 90 (noventa) meses. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "A nova lei, por não ser complementar, não poderia prever o parcelamento dessas dívidas de contribuições de seguridade social.",
        B: "O número máximo de meses de tal parcelamento extrapola o permitido pela Constituição Federal/88.",
        C: "O parcelamento das contribuições de seguridade social, por determinação da Constituição Federal/88, precisa ser acompanhado do pagamento de uma parcela inicial que represente 20% do valor total da dívida.",
        D: "A Constituição Federal, dada a relevância da seguridade social, veda a concessão de qualquer tipo de parcelamento de dívidas de contribuição previdenciária patronal."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 29,
      enunciado: "A sociedade empresária prestadora de serviços ABC Ltda., sediada no Município Alfa, deixou de declarar ao Fisco Municipal vários serviços que prestou no território desse município. Em razão disso, um agente fiscal do ISS municipal lavrou auto de infração com multa e encargos em face da referida sociedade empresária, por não ter prestado as declarações no prazo e na forma da legislação tributária. Notificada do auto de infração para o pagamento, a sociedade empresária nem pagou nem impugnou o lançamento. Em razão do não pagamento, a Procuradoria do Município ingressou com uma ação de cobrança pelo rito comum contra a sociedade ABC Ltda., fundamentada no Código de Processo Civil. Sobre a ação de cobrança ajuizada pela Procuradoria do Município, assinale a afirmativa correta.",
      alternativas: {
        A: "A via judicial adequada para a cobrança seria a ação de execução fiscal, e não uma ação de cobrança regida pelo Código de Processo Civil.",
        B: "O prazo prescricional do Fisco Municipal para a constituição do crédito tributário era de cinco anos, contados do primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado.",
        C: "O prazo decadencial do Fisco Municipal para a constituição do crédito tributário era de cinco anos contados da data do fato gerador da obrigação tributária.",
        D: "A modalidade de lançamento efetivamente utilizada pelo agente fiscal do ISS foi o lançamento por declaração."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 30,
      enunciado: "Tertuliano vem acumulando ilicitamente dois cargos públicos em autarquias federais diferentes. Ao detectar tal situação, após os devidos trâmites, a autoridade competente notificou o servidor para que ele optasse pelo cargo em que pretendia permanecer. Em decorrência da omissão de Tertuliano em realizar a aludida escolha, foi publicada a portaria atinente à instauração do processo administrativo disciplinar por acumulação ilegal de cargos. Tertuliano procurou você, como advogado(a), para saber das peculiaridades do andamento desse procedimento. Diante dessa situação hipotética, assinale a afirmativa que indica, corretamente, sua orientação.",
      alternativas: {
        A: "A análise do caso deverá ser feita por uma comissão processante, composta de três servidores estáveis, cujo presidente deverá ser ocupante de cargo superior ou de mesmo nível de Tertuliano.",
        B: "A comissão processante, caracterizada a acumulação ilegal e provada a má-fé de Tertuliano, deverá indicar o cargo que estará sujeito à pena de demissão.",
        C: "A notificação para que Tertuliano realize a opção por um dos cargos vai contra a lei, pois ele deve ser demitido de ambos os cargos ilicitamente acumulados, após o devido processo administrativo.",
        D: "A opção de Tertuliano por um dos cargos até o último dia do prazo para defesa configura sua boa-fé, hipótese que se converterá, automaticamente, em pedido de exoneração do outro cargo."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 31,
      enunciado: "O Estado Beta, após os devidos trâmites, promoveu a concessão de serviços de sua competência para a sociedade empresária Servicaos. Em decorrência do descumprimento de algumas cláusulas contratuais que estão impactando a qualidade da atividade delegada, o poder concedente editou um decreto, contendo a designação do interventor, o prazo da intervenção e os objetivos e limites da medida, a fim de assegurar a adequação na prestação do serviço, bem como o fiel cumprimento das normas contratuais, regulamentares e legais pertinentes. Em razão disso, a sociedade empresária Servicaos procura você, na condição de advogado(a), a fim de obter esclarecimentos acerca da validade e dos desdobramentos da medida adotada. Assinale a opção que apresenta o esclarecimento correto a ser prestado.",
      alternativas: {
        A: "A medida é nula, pois não poderia se materializar por meio de decreto, na medida em que o Poder Concedente deveria ter editado uma lei autorizativa para tal finalidade.",
        B: "Após o devido processo administrativo, a constatação de inexecução do contrato deve ensejar sua extinção, constituindo causa justificadora da encampação, que independe do interesse público.",
        C: "O Poder Concedente, declarada a intervenção, deverá, no prazo de 30 dias, instaurar procedimento administrativo para comprovar as causas determinantes da medida e apurar as responsabilidades, assegurado o direito de ampla defesa.",
        D: "A administração do serviço, cessada a intervenção e caso não seja extinta a concessão, será devolvida à concessionária, independentemente da prestação de contas do interventor, na medida em que este não responde pelos atos por ele praticados na vigência da medida."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 32,
      enunciado: "Com o intuito de promover o tombamento de dois imóveis vizinhos de inequívoco valor histórico e cultural, o Instituto do Patrimônio Histórico Nacional (Iphan), autarquia federal, no exercício de suas atribuições, promoveu a notificação dos respectivos proprietários: o Município Alfa e a senhora Maria Silva. Maria Silva acredita que terá graves prejuízos financeiros com a materialização do tombamento de ambos os imóveis, razão pela qual, logo após a notificação, procurou você, como advogado(a), para dirimir dúvidas acerca da matéria. À luz do disposto no Decreto-Lei nº 25/1937, assinale a opção que apresenta, corretamente, o esclarecimento que você deu a Maria Silva.",
      alternativas: {
        A: "Com a notificação, considera-se que ocorreu o tombamento provisório do imóvel de Maria.",
        B: "A conclusão do tombamento do imóvel do Município Alfa não gera qualquer efeito sobre o imóvel de Maria.",
        C: "Caso Maria realize tempestivamente a impugnação relacionada ao imóvel de sua propriedade, não será cabível o tombamento compulsório.",
        D: "Não é possível o tombamento do imóvel vizinho à propriedade de Maria, por se tratar de bem público que integra o patrimônio do Município Alfa."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 33,
      enunciado: "Januário, ex-prefeito do Município Imaginário, teve conhecimento de um inquérito civil que tem por objeto avaliar condutas praticadas no exercício de seu mandato que se enquadram como atos de improbidade e que causaram prejuízo ao erário. Em razão disso, ele procurou você, na qualidade de advogada(o), para definir uma estratégia de defesa, destacando que tem provas de que não praticou qualquer ato doloso de improbidade. Considerando as informações do caso concreto e o que dispõe a legislação em vigor, assinale a afirmativa correta.",
      alternativas: {
        A: "Caso Januário tenha praticado ato ímprobo de forma culposa, poderá haver responsabilização e ele estará sujeito a sanções de perda de bens acrescidos ilicitamente.",
        B: "A responsabilização por dano ao erário, nos termos da legislação vigente, exige conduta dolosa, mas Januário também poderá ser responsabilizado por improbidade administrativa decorrente de ação ou omissão culposa.",
        C: "Caso seja proposta ação de improbidade e resulte comprovado que Januário agiu com dolo, a perda da função pública e a suspensão de direitos políticos somente podem ser aplicadas quando houver condenação definitiva transitada em julgado.",
        D: "A legitimidade ativa para a propositura de ação de improbidade administrativa é exclusiva do Ministério Público competente."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 34,
      enunciado: "O Município Alfa contratou, mediante concorrência, uma sociedade empresária para a construção de uma creche. O edital previa como critério de aceitabilidade do preço global a quantia de R$ 1.000.000,00 (um milhão de reais). Ao longo da execução contratual, surgiu a necessidade de acréscimos nos serviços inicialmente previstos. Com base na situação descrita e no disposto na Lei nº 14.133/2021, assinale a afirmativa correta.",
      alternativas: {
        A: "Considerando que se trata de obra, o contratado é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos que se fizerem nos serviços em até 50% do valor inicial atualizado do contrato.",
        B: "Os acréscimos poderão ultrapassar os limites previstos na Lei nº 14.133/2021, desde que haja autorização legislativa do Município Alfa.",
        C: "O Município Alfa não pode alterar unilateralmente o contrato de obra, devendo firmar acordo bilateral com a sociedade empresária contratada, sob pena de nulidade.",
        D: "Tratando-se de obra, o contratado é obrigado a aceitar, nas mesmas condições contratuais, os acréscimos que se fizerem nos serviços em até 25% do valor inicial atualizado do contrato."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 35,
      enunciado: "Cássio é proprietário de um imóvel rural que não cumpre a função social da propriedade, e o Governo Federal decide desapropriá-lo para fins de reforma agrária. Irresignado, Cássio procura um advogado e informa que plantou café no terreno, mas que a plantação nunca deu frutos por causa do solo infértil, e que o imóvel possui uma represa e um paiol, construídos por ele. Considerando a situação apresentada e as normas que tratam da desapropriação por interesse social para reforma agrária, assinale a afirmativa correta.",
      alternativas: {
        A: "A justa e prévia indenização por desapropriação por interesse social para reforma agrária será paga integralmente em títulos da dívida agrária.",
        B: "As benfeitorias úteis e necessárias serão pagas em títulos de dívida agrária, ao passo que as voluptuárias serão indenizadas em dinheiro.",
        C: "A indenização de terra nua será paga em títulos de dívida agrária, ao passo que as benfeitorias úteis e necessárias serão indenizadas em dinheiro.",
        D: "A represa e o paiol são benfeitorias voluptuárias e a plantação de café é benfeitoria útil, devendo todas as benfeitorias serem indenizadas em dinheiro."
      },
      gabarito: "C",
      anulada: false
    },
    // ──────────────────────────────────────────────
    // 42º EXAME DE ORDEM UNIFICADO
    // ──────────────────────────────────────────────
    {
      numero: 36,
      enunciado: "Determinada operação de combate à corrupção conduzida pela Polícia Federal reuniu elementos indicativos de autoria e materialidade da prática de crime por parte de Cláudio, advogado regularmente inscrito na Ordem dos Advogados do Brasil. Com base nesses elementos, a Justiça Federal expediu mandado de busca e apreensão, específico e pormenorizado, o qual foi cumprido, na presença de representante da OAB, no endereço residencial de Cláudio, o qual também lhe servia como local de trabalho. Foram apreendidos e periciados um notebook e dois aparelhos de telefone celular, todos contendo informações sobre diversos processos de clientes patrocinados por Cláudio. A respeito da validade jurídica da diligência realizada e da utilização das informações encontradas nas mídias apreendidas, assinale a afirmativa correta.",
      alternativas: {
        A: "A medida cautelar decretada é inválida, uma vez que o Estatuto da Advocacia assegura a inviolabilidade absoluta do escritório ou local de trabalho do advogado, e, portanto, as informações encontradas sobre os clientes de Cláudio não podem ser utilizadas.",
        B: "A medida cautelar decretada é válida, porque não foi cumprida no escritório de Cláudio, mas na sua residência, porém as informações encontradas sobre os clientes de Cláudio estão protegidas de modo insuperável pelo Estatuto da Advocacia e, portanto, não podem ser utilizadas.",
        C: "A medida cautelar decretada é inválida, tendo em vista a inviolabilidade do escritório ou local de trabalho do advogado, mas as informações encontradas sobre os clientes de Cláudio podem ser utilizadas, caso esses clientes também figurem formalmente como investigados.",
        D: "A medida cautelar decretada é válida, e as informações encontradas sobre os clientes de Cláudio poderão ser utilizadas se esses clientes forem formalmente investigados como partícipes ou coautores pela prática do mesmo crime que deu causa à decretação da medida."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 37,
      enunciado: "O advogado Antônio Carlos ajuizou, em favor de sua cliente Celina, lide manifestamente temerária em face de João. A esse respeito, à luz do Estatuto da Advocacia e da OAB, assinale a afirmativa correta.",
      alternativas: {
        A: "A responsabilidade de Antônio Carlos e Celina será solidária, independentemente do intuito de lesar João, parte contrária.",
        B: "Não há responsabilidade solidária entre Celina e Antônio Carlos se comprovado que não estavam coligados nos seus intuitos.",
        C: "Celina poderá ser responsabilizada se comprovada a violação do dever de cuidado, ao constar como parte autora no processo, ainda que não esteja coligada com seu advogado.",
        D: "Caso comprovado que Celina não sabia do conteúdo temerário da lide, Antônio Carlos não poderá ser civilmente responsável de forma isolada, porque a responsabilização do advogado exige participação dolosa de Celina."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 38,
      enunciado: "Roberto Silva, advogado e sócio fundador da sociedade de advogados Silva e Souza Advogados Associados, foi eleito para o cargo de Prefeito do Município Ômega. Embora feliz e motivado com o mandato que lhe foi confiado pela população, Roberto Silva não gostaria de se retirar da sociedade de advogados por ele fundada. Considerando o Estatuto da Advocacia e da OAB, assinale a afirmativa que descreve corretamente a situação societária e a eventual atuação de Roberto Silva como advogado após assumir o cargo de Prefeito de Ômega:",
      alternativas: {
        A: "É impositiva a exclusão de Roberto Silva da sociedade de advogados Silva e Souza Advogados Associados, dada a incompatibilidade do cargo de Prefeito Municipal com a advocacia.",
        B: "O exercício do mandato de Prefeito de Ômega impede apenas que Roberto Silva advogue contra a Fazenda Pública que o remunera, no caso o Município Ômega, não havendo óbice para que continue integrando a sociedade de advogados e atuando em causas diversas.",
        C: "O exercício do mandato de Prefeito de Ômega é incompatível com a advocacia, mas, por si só, não excluirá Roberto Silva da sociedade de advogados Silva e Souza Advogados Associados, a qual poderá continuar explorando o nome e a imagem do seu fundador em benefício da sociedade.",
        D: "Embora incompatível com a advocacia, o exercício do cargo de Prefeito de Ômega, por si só, não excluirá Roberto Silva da sociedade de advogados Silva e Souza Advogados Associados. Contudo, deve o fato ser averbado no registro da sociedade, bem como observada a incompatibilidade temporária."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 39,
      enunciado: "A advogada Nina exerce função na diretoria do Conselho Federal da OAB. Em virtude exclusivamente das funções desempenhadas na OAB, Nina toma conhecimento de certos fatos envolvendo seus colegas advogados João e Maria. Nina acaba de receber uma intimação para depor como testemunha em audiência de instrução e julgamento, referente a uma ação indenizatória, de cunho meramente patrimonial, sem envolver grave ameaça ao direito à vida e à honra, ajuizada por Maria em face de João, cujo objeto tem relação com mencionados fatos de que tomou conhecimento no exercício da citada função no Conselho Federal da OAB. Considerando a situação hipotética, assinale a afirmativa correta.",
      alternativas: {
        A: "Nina não deve depor sobre os fatos que soube, diante do sigilo profissional.",
        B: "Nina não poderá alegar sigilo profissional em razão da natureza das funções exercidas no Conselho Federal da OAB.",
        C: "Nina deverá relatar os fatos sobre os quais tomou conhecimento, pois se trata de ação indenizatória, de cunho meramente patrimonial.",
        D: "Nina tem o dever legal de permanecer em silêncio sobre os fatos indagados, salvo em circunstâncias excepcionais, tais como a defesa judicial de familiares e amigos íntimos."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 40,
      enunciado: "Roberto Gil, professor de Direito Administrativo da Universidade Federal do Estado Alfa, é casado com Maria Amélia, servidora do Ministério da Saúde há 35 anos. Maria Amélia contou a seu esposo que várias colegas do Ministério da Saúde estão ajuizando ações contra a União, em que postulam o recebimento de gratificações de atividade de combate e controle de endemias, e indagou a Roberto Gil se poderia assumir o patrocínio dessas causas como advogado. Com base no caso narrado, sobre as incompatibilidades e impedimentos ao exercício da advocacia, assinale a afirmativa correta.",
      alternativas: {
        A: "O exercício da advocacia é incompatível com a de professor de Universidade Federal, não sendo possível a Roberto que atue no patrocínio de qualquer causa como advogado no Poder Judiciário.",
        B: "Roberto Gil não poderá assumir o patrocínio dessas causas, porque, sendo servidor da administração federal indireta, está impedido de exercer a advocacia contra a União, diante da vinculação existente entre a Universidade Federal e a União.",
        C: "Roberto Gil poderá assumir o patrocínio da causa apenas de sua esposa, pois, apesar de existir a regra de impedimento de exercício da advocacia contra a União por servidores da administração indireta, os membros da família estão incluídos no conceito de causa própria, o que autoriza a atuação em defesa de entes queridos.",
        D: "Embora, em regra, os servidores da administração indireta estejam impedidos de exercer advocacia contra a Fazenda Pública que os remunera ou à qual seja vinculada a entidade empregadora, Roberto Gil poderá assumir o patrocínio de causas contra a União, pois os docentes de cursos jurídicos não estão sujeitos a essa vedação."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 41,
      enunciado: "José Fabiano, advogado recém-inscrito na OAB, com dois anos e seis meses de exercício da profissão, decidiu se candidatar para o cargo de Conselheiro Seccional da Ordem. Durante o procedimento de verificação da regularidade de sua candidatura, observou-se que ele havia sido condenado pela prática da infração disciplinar de abandonar a causa sem justo motivo ou antes de decorridos dez dias da comunicação da renúncia, tendo-lhe sido imposta sanção de censura, sem que tenha ocorrido, até o momento da eleição, sua reabilitação. Com base nessa situação hipotética e considerando as eleições da OAB, assinale a afirmativa correta.",
      alternativas: {
        A: "José Fabiano somente poderá participar da eleição caso não haja outros candidatos dispostos a concorrer para o cargo, hipótese na qual as condições de elegibilidade são flexibilizadas para que a posição não fique vaga.",
        B: "José Fabiano não poderá participar da eleição corrente, porque ainda não completou o prazo de três anos de efetivo exercício profissional da advocacia e por ter sido apenado com sanção disciplinar, sem que tenha sucedido reabilitação.",
        C: "José Fabiano poderá participar da eleição e concorrer ao cargo de Conselheiro Seccional da OAB, porque exerce a profissão de advogado há mais de um ano e foi condenado por infração disciplinar leve, para a qual está prevista apenas a pena de censura.",
        D: "José Fabiano não poderá participar da eleição corrente e de futuras, porque, uma vez apenado com sanção disciplinar, o advogado não mais poderá recuperar sua condição de elegibilidade, estando impedido, indefinidamente, de se candidatar a cargos na OAB."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 42,
      enunciado: "A sociedade empresária Alfa contratou o advogado João Carlos para propor ação de repetição de indébito tributário contra a Fazenda Nacional. Foi outorgado mandato específico para a referida demanda e celebrado o respectivo contrato de honorários. No decorrer da prestação dos serviços, devido ao grande conhecimento de João Carlos em outras áreas do direito, bem como à sua pronta disponibilidade, os responsáveis pela Alfa passaram a consultá-lo informalmente sobre diversos assuntos da empresa, inclusive adotando medidas e tomando decisões a partir das orientações verbais prestadas. Seis meses após o início dessas consultas, a empresa Alfa e João Carlos formalizaram outro contrato de honorários advocatícios, com efeitos prospectivos, desta feita para a prestação da atividade consultiva em curso. Acerca da atuação profissional de João Carlos durante o período anterior à formalização do contrato de honorários, assinale a afirmativa correta.",
      alternativas: {
        A: "Não há como reconhecer as atividades prestadas por João Carlos no período anterior à formalização do contrato de honorários, pois a atuação do advogado, salvo em situações urgentes, exige a prova do mandato.",
        B: "A outorga de mandato para as atividades de consultoria jurídica é prescindível, porém a falta de formalização dos serviços prestados, por meio de contrato de honorários, torna o período anterior insuscetível de reconhecimento.",
        C: "As atividades prestadas por João Carlos no período podem ser reconhecidas, uma vez que a consultoria jurídica independe de outorga de mandato ou formalização por contrato de honorários, sendo desinfluente o modo pelo qual foram prestados os serviços.",
        D: "O não reconhecimento das atividades prestadas por João Carlos no período anterior à formalização do contrato de honorários decorre do fato de que a atuação se deu de forma verbal, de tal modo que, se a atuação tivesse se dado por escrito, as atividades prestadas poderiam ser reconhecidas."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 43,
      enunciado: "Rita, advogada regularmente inscrita na OAB, compareceu ao Detran para providenciar a transferência de um veículo que acabara de adquirir. Instada a apresentar seu documento de identificação civil, Rita apresentou sua carteira da OAB, a qual não foi aceita pelo funcionário da repartição, que afirmou ser imprescindível a apresentação da Carteira de Identidade (Registro Geral) ou da Carteira Nacional de Habilitação (CNH). Com base no enunciado, a recusa do documento emitido pela OAB foi",
      alternativas: {
        A: "ilegítima, uma vez que o documento emitido pela OAB constitui prova de identidade civil para todos os fins legais.",
        B: "correta, pois, à míngua de previsão legal, não poderia o funcionário do Detran admitir a carteira da OAB como documento de identificação civil.",
        C: "inválida, pois, embora não haja expressa previsão legal, a carteira da OAB tem sido admitida como documento válido de identificação civil pela prática consuetudinária.",
        D: "inadequada, porém não ilegal, uma vez que os documentos de identidade profissional do advogado estão previstos somente no Regulamento Geral da Advocacia, não sendo exigível que o funcionário do Detran conheça as normas internas da OAB."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 44,
      enunciado: "\"Pois, segundo entendo, no limite do cognoscível é que se avista, a custo, a ideia do Bem — e, uma vez avistada, compreende-se que ela é para todos a causa de quanto há de justo e belo...\" (Platão) Em seu livro A República, Platão conta a famosa Alegoria da Caverna, ensinando a não confundir aparência (imperfeita) com essência (perfeita). Nesse sentido, é correto afirmar que, para Platão, a Justiça corresponde",
      alternativas: {
        A: "a uma prática que decorre dos atos justos praticados por homens justos.",
        B: "ao contrato social que assegura os direitos e as liberdades individuais.",
        C: "ao processo histórico de luta contra a exploração e a conquista da emancipação.",
        D: "a uma concepção ideal a ser conhecida e compreendida pela razão."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 45,
      enunciado: "\"O governo é o exercício do poder supremo do Estado. Este poder só poderia estar ou nas mãos de um só, ou da minoria, ou da maioria das pessoas. Quando o monarca, a minoria ou a maioria não buscam, uns ou outros, senão a felicidade geral, o governo é necessariamente justo.\" (Aristóteles) No livro A Política, Aristóteles fala do que ele considera as formas adequadas ou justas de governo de um, de poucos e de muitos. São elas, respectivamente, monarquia, aristocracia e república. Porém, ele afirma que cada uma dessas formas de governo pode degenerar, respectivamente, para uma forma injusta. Seriam elas:",
      alternativas: {
        A: "Tirania, que busca apenas a utilidade do monarca; oligarquia, que busca apenas a utilidade dos ricos; e democracia, que busca apenas a utilidade dos pobres.",
        B: "Imperialismo, que busca apenas o que é bom para o império; aporofobia, que busca apenas o que é bom para os ricos; e timocracia, que busca apenas o que é bom para os pobres.",
        C: "Cleptocracia, que admite os desvios de quem governa; parlamentarismo, que enfraquece o poder do governante; e agorafobia, que enfraquece o poder dos cidadãos.",
        D: "Misticismo, que cria um fetiche em torno do governante; elitismo, em que apenas um pequeno grupo governa de fato; e assembleísmo, que dificulta o processo de decisão política."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 46,
      enunciado: "No processo legislativo afeto ao projeto de Lei Complementar nº XXX e à proposta de Emenda Constitucional nº YYY, o Congresso Nacional aprovou a redação final de ambas. Como divulgado pela imprensa, auxiliares do Presidente da República entendiam que, tanto o projeto de Lei Complementar quanto a proposta de Emenda Constitucional melhor atenderiam aos seus objetivos se fossem suprimidos alguns dispositivos de ambos. Com essa convicção, sugeriram que o Presidente da República usasse do seu poder de veto, a fim de adequar os referidos textos àquilo que entendiam ser melhor para os interesses do país. Sobre o poder de veto do Poder Executivo, segundo o sistema jurídico constitucional brasileiro, assinale a afirmativa correta.",
      alternativas: {
        A: "A Constituição da República não concede o poder de veto ao Chefe do Poder Executivo, por ser um instituto jurídico que desequilibraria a divisão de poderes.",
        B: "O Presidente da República pode vetar parte do projeto de Lei Complementar nº XXX, mas não tem poderes para fazer o mesmo em relação à proposta de Emenda Constitucional nº YYY.",
        C: "O poder de veto do Presidente da República se restringe às leis ordinárias, logo, não poderá vetar dispositivos do projeto de Lei Complementar nº XXX e da proposta de Emenda Constitucional nº YYY.",
        D: "Os dispositivos pertencentes ao projeto de Lei Complementar nº XXX e à proposta de Emenda Constitucional nº YYY podem ser vetados, conforme as competências concedidas àquele que detém a Chefia do Poder Executivo."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 47,
      enunciado: "O Conselho Nacional de Justiça (CNJ) recebeu expediente relacionado à atuação de João, Juiz de Direito do Estado Delta. De acordo com a narrativa, em sede cautelar, no âmbito de processo penal, João proferiu decisão judicial que violou a ordem constitucional, pois teria condenado uma pessoa sem que ela e seu advogado tivessem participado da colheita da prova. A referida manifestação solicitava, então, que o ato judicial praticado pelo magistrado fosse devidamente revisto pelo CNJ. À luz dessa narrativa, segundo a Constituição da República, assinale a opção que indica, corretamente, o entendimento a ser adotado pelo CNJ em relação à almejada revisão do ato judicial praticado.",
      alternativas: {
        A: "O CNJ é parte da estrutura do Poder Judiciário, mas não está constitucionalmente autorizado a rever ou desconstituir a decisão judicial em tela.",
        B: "A matéria deve ser analisada pelo CNJ que, por ser órgão do Poder Judiciário, terá plenos poderes para desconstituir a decisão judicial em tela.",
        C: "O CNJ, por ser órgão de controle externo diretamente vinculado ao Ministério da Justiça, não poderá exercer controle da atividade jurisdicional.",
        D: "O CNJ não faz parte da estrutura do Poder Judiciário e, apesar dos seus poderes jurisdicionais atípicos, não está autorizado a desconstituir a decisão judicial."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 48,
      enunciado: "Algumas lideranças partidárias do Congresso Nacional têm considerado inadequadas as políticas públicas adotadas por diversos Estados, as quais, para essas lideranças, não se compatibilizavam com as iniciativas adotadas pela União. Por esta razão, informaram que pretendem propor uma emenda à Constituição da República, segundo a qual qualquer deliberação legislativa estadual pode vir a ser anulada pelo Congresso Nacional, enquanto qualquer ato emanado por governadores pode vir a ser revisto pelo Presidente da República. Sobre a hipótese, segundo a ordem jurídica vigente no Brasil, assinale a afirmativa correta.",
      alternativas: {
        A: "O Congresso Nacional, investido na função de poder constituinte reformador, pode estabelecer essa alteração, por se tratar de proposição de emenda à Constituição.",
        B: "Os Estados-membros, por serem dotados de autonomia, podem ampliar seus poderes, inclusive o direito de secessão, mas não poderiam ter seus atuais poderes restringidos.",
        C: "O sistema constitucional prevê a subordinação dos poderes dos Estados-membros aos poderes da União, o que torna desnecessária a emenda para atingir os objetivos pretendidos.",
        D: "Uma emenda constitucional com esse teor atacaria frontalmente o princípio federativo e, por violar cláusula pétrea, seria considerada incompatível com a Constituição da República."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 49,
      enunciado: "O governador do Estado Alfa determinou, de forma deliberada, que Alfa deixasse de realizar os depósitos para pagamento de dívida fundada que possui com a União. Alertado sobre possíveis consequências jurídico-políticas passíveis de recaírem sobre o Estado Alfa, após dois anos de suspensão dos pagamentos, decidiu consultar o Procurador-Geral do Estado sobre a repercussão que tal situação poderia causar. Sobre a hipótese apresentada, segundo o sistema jurídico-constitucional brasileiro, assinale a opção que apresenta, corretamente, o parecer do Procurador-Geral do Estado.",
      alternativas: {
        A: "O Presidente da República poderá decretar a intervenção federal no Estado Alfa, sendo necessária a apreciação a posteriori do Congresso Nacional.",
        B: "O Estado Alfa, em razão de sua condição de ente autônomo da República Federativa do Brasil, não se sujeita à intervenção por parte da União.",
        C: "O Presidente da República somente poderá decretar intervenção federal no Estado Alfa após decisão judicial por parte do Supremo Tribunal Federal.",
        D: "O Presidente da República poderá decretar intervenção federal no Estado Alfa, a ser executada pelo Congresso Nacional, diretamente ou por meio da autoridade que indicar."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 50,
      enunciado: "O Presidente da Assembleia Legislativa do Estado Alfa, almejando que fosse respeitada a igualdade jurídica entre parlamentares estaduais e federais e considerando a autonomia dos distintos entes federativos, tencionava levar à votação do plenário da Casa Legislativa o projeto de lei que fixa o subsídio dos Deputados Estaduais em valor idêntico ao dos Deputados Federais. Com esse objetivo, consultou você, como procurador(a) jurídico(a) da Assembleia Legislativa, a respeito da compatibilidade do projeto de lei com a Constituição da República. Com base na situação descrita e no sistema jurídico-constitucional brasileiro de 1988, assinale a opção que apresenta, corretamente, sua resposta.",
      alternativas: {
        A: "A CRFB/88 estabelece que deve haver igualdade jurídica de tratamento entre os parlamentares, sendo assim, o projeto de lei atende aos ditames constitucionais ao igualar o subsídio dos Deputados Estaduais ao dos Deputados Federais.",
        B: "O Presidente da Assembleia Legislativa do Estado Alfa pode levar à votação o projeto de lei, entretanto, por se tratar de matéria constitucional, subsídios de parlamentares, há a necessidade de que o projeto seja aprovado por três quintos dos votos em dois turnos de votação.",
        C: "A CRFB/88 estabelece a paridade de subsídios entre Deputados Estaduais e Senadores, pois os últimos são os representantes dos Estados-membros no Congresso Nacional, havendo, portanto, necessidade de se alterar o projeto de lei.",
        D: "O projeto de lei não está em harmonia com a CRFB/88, pois o subsídio dos Deputados Estaduais está limitado ao máximo de 75% do subsídio estabelecido para os Deputados Federais."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 51,
      enunciado: "Renato Carlos, renomado pianista, foi convidado para se apresentar em um grande evento musical internacional sediado no Brasil. Ao tentar se inscrever no evento, foi informado de que era obrigatório estar inscrito em uma ordem dos músicos para poder se apresentar publicamente no país. Surpreendido com a informação, procurou você, como advogado(a), e solicitou que fosse analisada a compatibilidade da exigência com o sistema jurídico-constitucional brasileiro. Em relação à exigência, assinale a opção que indica, corretamente, a orientação dada.",
      alternativas: {
        A: "Válida, pois se harmoniza com o poder regulamentar das entidades de classe, regra a ser observada no exercício profissional no Brasil.",
        B: "Viola a ordem constitucional, pois a liberdade profissional é um direito com alto grau de amplitude, sendo vedado ao legislador estabelecer condições para o seu exercício.",
        C: "Está de acordo com a Constituição da República, pois visa zelar pelo regular exercício da profissão de músico no país, garantindo maior qualidade no desempenho profissional.",
        D: "Encontra-se em desacordo com a Constituição da República, pois, além de não proteger interesse público relevante, viola o princípio da liberdade de expressão artística."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 52,
      enunciado: "Você está participando de um debate na OAB de sua cidade sobre direitos humanos de comunidades tradicionais, quando é questionado sobre a identificação e o reconhecimento dos remanescentes das comunidades quilombolas. Assinale a opção que apresenta, corretamente, sua resposta.",
      alternativas: {
        A: "Os grupos étnico-raciais, segundo critérios de autoatribuição, com trajetória histórica própria, dotados de relações territoriais específicas, com presunção de ancestralidade negra relacionada à resistência e à opressão histórica sofrida.",
        B: "Todo e qualquer cidadão ou cidadã que esteja privado do seu direito à moradia em função de grave violação de direitos humanos e que seja descendente de imigrantes que se estabeleceram no Brasil com ou sem autorização de permanência dada pelo Estado brasileiro.",
        C: "A população afrodescendente brasileira, que vive processos de privação de direitos e, por isso, busca tanto os meios próprios de subsistência quanto a reparação pelos preconceitos e pela discriminação que sofreu e que resultaram em restrições de acesso à terra e à moradia.",
        D: "Os povos originais, aos quais são reconhecidos a organização social, os costumes, as línguas, as crenças e as tradições, bem como os direitos originários sobre as terras que tradicionalmente ocuparam, competindo à União demarcá-las, proteger e fazer respeitar todos os seus bens."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 53,
      enunciado: "Um cidadão venezuelano, que ingressou de forma irregular no país, com o propósito de regularizar sua situação no Brasil, procura você, como advogado(a), para ter sua assistência jurídica. Nesse contexto, com base nos direitos dos refugiados e migrantes, assinale a opção que apresenta, corretamente, sua orientação.",
      alternativas: {
        A: "O reconhecimento da condição de refugiado não impedirá o prosseguimento do processo administrativo eventualmente já instaurado para a apuração do seu ingresso irregular no país.",
        B: "De acordo com a legislação brasileira, o cidadão em questão terá sua condição de refugiado reconhecida se demonstrar que foi obrigado a deixar seu país de nacionalidade em razão de grave e generalizada violação de Direitos Humanos.",
        C: "Se a sua vinda para o Brasil não tiver sido motivada pelo risco de responder penalmente, no âmbito do Estado de origem, pelo cometimento de crime de natureza política, ele deverá solicitar a concessão de asilo político, ao invés do refúgio.",
        D: "De acordo com a legislação brasileira, se for solicitado o reconhecimento da sua condição de refugiado, o indivíduo somente terá proteção jurídica após a devida instrução e o devido encerramento do procedimento para a obtenção de refúgio no Comitê Nacional para os Refugiados - Conare. Antes disso, poderá ser expulso ou deportado, como decorrência da sua entrada irregular no país."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 54,
      enunciado: "O Partido Político Alfa tomou conhecimento de que Joana, candidata ao cargo de Deputada Estadual, estava veiculando propaganda eleitoral paga, na imprensa escrita, durante a sua campanha eleitoral. Como o desempenho de Joana nas pesquisas eleitorais aumentou consideravelmente, o Partido Político o consultou, na condição de advogado, em relação à licitude dessa conduta. Sobre a veiculação da propaganda realizada por Joana, assinale a opção que indica, corretamente, sua resposta.",
      alternativas: {
        A: "Admitida até o dia da eleição, desde que observados os balizamentos legais.",
        B: "Permitida, até a antevéspera da eleição, observados os balizamentos legais.",
        C: "Vedada, logo, Alfa pode ajuizar representação eleitoral almejando a aplicação de multa.",
        D: "Deve ser considerada ilícita se não tiver sido celebrado ajuste coletivo, pelos partidos políticos, autorizando-a, o que será apurado em investigação judicial eleitoral."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 55,
      enunciado: "Pedro, com 40 anos de idade, por razões ideológicas, decidiu não mais votar nas eleições para o provimento de cargos dos Poderes Executivo e Legislativo dos distintos níveis da Federação. Após repetir esse procedimento em três eleições consecutivas, compareceu ao cartório eleitoral e solicitou uma certidão de quitação eleitoral para que pudesse requerer a emissão do seu passaporte. Para sua surpresa, foi informado que sua inscrição fora cancelada, o que, ao seu ver, o impediria de obter o passaporte. Irresignado com a situação descrita, Pedro consultou você, como advogado(a), a respeito da juridicidade desse procedimento. Assinale a opção que apresenta a informação correta.",
      alternativas: {
        A: "A obtenção do passaporte instrumentaliza o direito de ir e vir, o que não é influenciado pelo exercício do direito de voto.",
        B: "O exercício da objeção de consciência, como a realizada por ele, é amparado pela legislação eleitoral, sendo uma forma de exercício dos direitos políticos, logo o cancelamento foi ilícito.",
        C: "A inscrição eleitoral instrumentaliza o direito de votar, que não pode ser obstado pela prática de ilícitos eleitorais, o que configuraria sanção política, logo não poderia ter sido cancelada.",
        D: "O cancelamento é correto, caso ele não tenha pagado a multa ou apresentado justificativa no prazo previsto na legislação, a contar da última eleição a que deveria ter comparecido."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 56,
      enunciado: "Você atua, como advogado(a), em um caso em que seu cliente, Luka, croata, de 65 anos de idade e 6 anos de residência fixa no Brasil, sem família no país, foi condenado, com sentença transitada em julgado, pela prática do crime de estupro no Brasil. Com base no que dispõe a Lei de Migração (Lei nº 13.445/2017), a condenação ensejará a expulsão de Luka do Brasil,",
      alternativas: {
        A: "sem a possibilidade de impedimento de reingresso.",
        B: "conjugada com o impedimento de reingresso por prazo determinado.",
        C: "conjugada com o impedimento de reingresso por prazo indeterminado.",
        D: "com a possibilidade de reingresso, por ser pessoa com mais de 60 anos de idade e residente no país."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 57,
      enunciado: "No Brasil, quanto às formas de ingresso no país, é aplicada a política de visto por reciprocidade, de acordo com a nacionalidade do estrangeiro. O tipo de visto, previsto na Lei de Migração, depende do objetivo da viagem do solicitante ao Brasil. A Lei de Migração (Lei nº 13.445/2017) ajustou o tratamento do estrangeiro no Brasil aos preceitos constitucionais. Sobre as formas de ingresso no país, segundo a legislação pertinente, assinale a afirmativa correta.",
      alternativas: {
        A: "O visto é o documento que dá a seu titular o direito adquirido de ingresso em território nacional.",
        B: "Ao solicitante que pretenda ingressar ou permanecer em território nacional poderá ser concedido visto de visita, temporário, diplomático e oficial. A Lei de Migração não prevê o visto de cortesia.",
        C: "É causa de recusa absoluta de visto, sem possibilidade de entrevista individual e necessidade de ato fundamentado, quando a razão da viagem não seja condizente com o visto ou com o motivo alegado para a isenção de visto.",
        D: "O visto temporário para pesquisa, ensino ou extensão acadêmica poderá ser concedido ao imigrante com ou sem vínculo empregatício com a instituição de pesquisa ou de ensino brasileira, sendo exigida, na hipótese de vínculo, a comprovação de formação compatível."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 58,
      enunciado: "O Prefeito e a Câmara de Vereadores de Alfa, município com cem mil habitantes, situado no interior do Estado Beta, pretendem modernizar a administração pública municipal. Assim, iniciaram um programa de ampliação da transparência da gestão fiscal, que prevê a implantação de mecanismos previstos na Constituição Federal de 1988 e na Lei de Responsabilidade Fiscal, objetivando dar maior efetividade ao princípio da transparência fiscal. Sobre a hipótese formulada, assinale a afirmativa correta.",
      alternativas: {
        A: "As contas apresentadas pelo Prefeito devem ficar disponíveis, durante todo o exercício, apenas no órgão técnico responsável pela sua elaboração, para consulta e apreciação pelos cidadãos e instituições da sociedade.",
        B: "A realização de audiências públicas durante os processos de elaboração e discussão dos planos, da lei de diretrizes orçamentárias e dos orçamentos não pode ser aplicada ao Município Alfa, mas tão somente às esferas estadual ou federal.",
        C: "O Município Alfa está obrigado a disponibilizar em meio eletrônico de amplo acesso público suas informações e seus dados contábeis, orçamentários e fiscais de acordo com uma periodicidade, um formato e um sistema estabelecidos pelo órgão central de contabilidade da União.",
        D: "A prestação de contas do Prefeito deve ter ampla divulgação, mas o respectivo parecer prévio do Tribunal de Contas do Estado Beta sobre tais contas é apenas enviado à Câmara de Vereadores para que estas possam ser julgadas, não podendo ser veiculado em meios eletrônicos de acesso público."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 59,
      enunciado: "Em certo período de apuração, a despesa total de pessoal da União alcançou o patamar de 60% da receita corrente líquida (RCL), de acordo com os critérios de cálculo estabelecidos na Lei Complementar nº 101/2000 (Lei de Responsabilidade Fiscal – LRF). Sobre o patamar alcançado, assinale a afirmativa correta.",
      alternativas: {
        A: "Viola o limite válido para a esfera federal estabelecido na LRF, que é expressamente previsto em 45% da RCL.",
        B: "Viola o limite válido para a esfera federal estabelecido na LRF, que é expressamente previsto em 50% da RCL.",
        C: "Situa-se abaixo do limite válido para a esfera federal estabelecido na LRF, que está expressamente previsto em 70% da RCL.",
        D: "Mantém-se dentro do limite válido para a esfera federal estabelecido na LRF, uma vez que configura o limite previsto naquela norma jurídica."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 60,
      enunciado: "José foi citado, em janeiro de 2022, em uma ação de execução fiscal movida pela Fazenda Nacional para cobrança de Imposto sobre a Renda de Pessoa Física (IRPF), cujo débito tributário foi por ele próprio apurado na sua Declaração de Ajuste Anual entregue à Secretaria da Receita Federal do Brasil, em março de 2017 (referente ao ano base de 2016). Sem nada fazer, em março daquele ano, foi intimado da penhora de sua conta bancária. Três meses após a intimação da penhora, José finalmente encontrou a guia DARF do IRPF integralmente paga dentro do prazo, no exato valor apurado como devido naquela declaração de ajuste anual. José, então, o(a) procura para, como advogado(a), adotar a medida processual cabível nos autos daquela ação de cobrança considerada indevida. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "José deverá oferecer embargos à execução, oportunidade em que poderá alegar a quitação da dívida tributária.",
        B: "Por ser matéria de ordem pública, será possível alegar apenas a prescrição daquela ação de execução fiscal, que teria ocorrido em dezembro de 2021.",
        C: "José poderá apresentar uma exceção de pré-executividade, demonstrando documentalmente, por meio da guia DARF, que o imposto havia sido pago tempestivamente.",
        D: "Caberá a José recorrer da decisão que determinou a penhora de sua conta bancária por meio de agravo de instrumento, sob fundamento de quitação da dívida tributária."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 61,
      enunciado: "João, pessoa com deficiência física, com base na Lei nº XXX do Estado Alfa que isenta as pessoas com tal deficiência do pagamento do Imposto sobre Propriedade de Veículo Automotor (IPVA), requereu à Secretaria da Fazenda do Estado Alfa a extensão da aplicação da norma isentiva para a Taxa Anual de Licenciamento Veicular do seu automóvel. Ele usou como argumento o fato de que aquela isenção visa resguardar o mínimo existencial e a capacidade contributiva das pessoas com deficiência. Entretanto, o pedido foi indeferido administrativamente. Irresignado, consultou você, como advogado(a), sobre a conduta a ser adotada. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "João, somente após realizar o depósito prévio em dinheiro, terá seu recurso admitido e poderá recorrer para a segunda instância administrativa.",
        B: "Tal taxa, como espécie de tributo contraprestacional, não pode ser objeto de isenção, sob pena de prejudicar a realização dos serviços específicos e divisíveis que ela financia.",
        C: "A legislação tributária que outorga isenção deve ser interpretada literalmente, não sendo extensível a isenção prevista em lei para o IPVA à Taxa Anual de Licenciamento Veicular não prevista na referida lei.",
        D: "João poderá ajuizar ação declaratória de inexistência de relação jurídico-tributária, uma vez que as isenções podem ser interpretadas extensivamente e sua condição de pessoa com deficiência é comprovável por laudo médico e perícia judicial."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 62,
      enunciado: "A sociedade empresária ABC Ltda. teve um auto de infração lavrado contra si pelo Fisco federal, em junho de 2021, lançando de ofício valores de tributo federal não declarados, nem pagos, referentes a fatos geradores ocorridos em junho de 2017. A sociedade empresária impugnou o auto dentro do prazo, apontando a existência de vício formal, o que foi reconhecido pelo Fisco federal, que anulou tal lançamento em junho de 2022. Diante desse cenário e à luz do texto expresso do Código Tributário Nacional, assinale a afirmativa correta.",
      alternativas: {
        A: "O Fisco poderá efetuar novo lançamento, contando-se o prazo decadencial de 5 anos da data em que se tornou definitiva a decisão que anulou, por vício formal, o lançamento anteriormente efetuado.",
        B: "O Fisco poderá efetuar novo lançamento, contando-se o prazo decadencial de 5 anos a partir de 1º/1/2023, primeiro dia do exercício seguinte àquele em que o novo lançamento poderia ter sido efetuado.",
        C: "O Fisco não poderá efetuar novo lançamento, pois o prazo decadencial de 5 anos se consumou em 1º/1/2023, 5 anos após o primeiro dia do exercício seguinte àquele em que o lançamento original poderia ter sido efetuado.",
        D: "O Fisco não poderá efetuar novo lançamento, pois o prazo decadencial de 5 anos se consumou em junho de 2022, 5 anos após a ocorrência dos fatos geradores objetos do lançamento original que foi anulado."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 63,
      enunciado: "Certa carga foi abandonada no Porto de Santos (SP) pela sociedade empresária Importação 100% Ltda. Em razão disso, passado o prazo previsto e obedecidas as formalidades da legislação tributária, foi aplicada pela Secretaria Especial da Receita Federal do Brasil (SERFB) a pena de perdimento de mercadoria importada por abandono. José, participando de leilão da SERFB, logra êxito em arrematar a carga abandonada. Sobre a arrematação de mercadorias abandonadas em leilão promovido pela SERFB, à luz do Código Tributário Nacional, assinale a afirmativa correta.",
      alternativas: {
        A: "José é considerado contribuinte do Imposto de Importação em relação às mercadorias abandonadas que arrematou.",
        B: "José será considerado responsável tributário pelo Imposto de Importação devido, juntamente com a Importação 100% Ltda.",
        C: "A base de cálculo do Imposto de Importação em leilão promovido pela SERFB será o valor de mercado que tais bens alcançariam.",
        D: "José, por ser pessoa física, não poderia arrematar bens oriundos da aplicação de pena de perdimento de mercadoria importada por abandono."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 64,
      enunciado: "Uma lei municipal do Município Alfa concedia isenção do IPTU a determinado segmento econômico. Contudo, em razão de dificuldades financeiras municipais, tal isenção foi revogada por nova lei, publicada em 20/2/2024, que estabelecia a produção de seus efeitos a partir de 1º/6/2024. A sociedade empresária ABC Ltda., que deixaria de ser beneficiada, questionou você, como advogado(a), para saber se tal lei revogadora não feriria as garantias tributárias constitucionais desse segmento. Diante desse cenário, assinale a opção que apresenta, corretamente, sua orientação.",
      alternativas: {
        A: "Seria necessária a alteração na Lei Orgânica do Município para revogar a isenção que favorecia a sociedade ABC Ltda.",
        B: "Por configurar cláusula pétrea, a isenção que favorecia a sociedade ABC Ltda. não poderia ser revogada, nem mesmo por emenda constitucional.",
        C: "A isenção que favorecia a sociedade ABC Ltda. poderia ser revogada, mas os efeitos da lei revogadora somente poderiam ser produzidos a partir de 1º/1/2025.",
        D: "A isenção que favorecia a sociedade ABC Ltda. não poderia ser revogada por mera lei municipal, mas apenas por Emenda Constitucional, por ser prevista como garantia tributária constitucional."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 65,
      enunciado: "O Município Alfa editou lei, aplicável após sua entrada em vigor, sem caráter retroativo, devidamente regulamentada por decreto, dispondo sobre o número máximo de pavimentos em edificações situadas em determinadas ruas à beira-mar, em bairros da cidade especificados. Cuida-se, pois, de restrição geral, que atinge um número indeterminado de particulares proprietários de imóveis, nos termos indicados pelas normas municipais. Gustavo, em decorrência da aludida determinação ter afetado sua propriedade, procurou você, como advogado(a), para ser informado sobre a modalidade de intervenção praticada pelo Estado. Assinale a opção que indica, corretamente, sua resposta.",
      alternativas: {
        A: "Trata-se de servidão administrativa, embasada no regular emprego do poder hierárquico, diante da supremacia do interesse público sobre o privado.",
        B: "Trata-se de limitação administrativa, embasada no regular emprego do poder de polícia, haja vista que visa condicionar o exercício do direito de propriedade ao cumprimento de sua função social.",
        C: "Trata-se de requisição administrativa, embasada no regular emprego do poder disciplinar, haja vista que visa disciplinar e compatibilizar o direito de propriedade ao cumprimento de sua função social.",
        D: "Trata-se de desapropriação indireta, embasada no emprego do poder regulamentar, haja vista que reduziu parcialmente o direito de propriedade, diante da supremacia do interesse público sobre o privado."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 66,
      enunciado: "João Silva, servidor público federal estável, ao assumir cargo efetivo com atribuições atinentes ao controle interno da Administração, constatou que, nos últimos dez anos, foram proferidos numerosos atos administrativos que ensejaram efeitos favoráveis a destinatários de boa-fé. Esses atos continham vícios de legalidade, sendo certo que, em muitos deles, o vício era de forma. Você foi contratado(a) como advogado(a) de Pedro, particular que figura como interessado em um determinado processo administrativo analisado por João Silva. À luz do disposto na Lei nº 9.784/99, assinale a opção que, corretamente, materializa a essência da consultoria jurídica que você, como advogado(a), apresentou a seu cliente Pedro.",
      alternativas: {
        A: "A eventual anulação dos atos administrativos viciados não precisa de motivação diante dos vícios verificados.",
        B: "Os atos administrativos viciados podem ser revogados, desde que respeitados os direitos adquiridos dos respectivos beneficiários.",
        C: "Os vícios de forma, caso se evidencie que não irão acarretar lesão ao interesse público nem prejuízo a terceiros, são passíveis de convalidação.",
        D: "Nos processos analisados por João Silva, os atos administrativos viciados poderão ser invalidados a qualquer tempo, pois não há prazo para o exercício do direito da Administração de anulá-los."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 67,
      enunciado: "Em decorrência de uma denúncia anônima, as autoridades competentes da União promoveram investigação e verificaram que Wagner, servidor público federal estável, cometeu infração disciplinar que também é capitulada como crime contra a Administração Pública. Em razão disso, de forma motivada, foi instaurado o respectivo processo administrativo disciplinar que, após exceder o prazo para a sua conclusão, sem prejuízo para a defesa, resultou na sua demissão. Wagner não se conforma com a mencionada penalidade e, inconformado, procura você, como advogado(a), para obter orientação sobre o caso. À luz da legislação aplicável aos servidores públicos federais, assinale a opção que apresenta, corretamente, a orientação a ser prestada a Wagner.",
      alternativas: {
        A: "A denúncia anônima, por si só, não pode fundamentar a instauração de processo administrativo disciplinar, mas é apta a deflagrar uma apuração preliminar para verificar a veracidade dos fatos alegados.",
        B: "A abertura do processo administrativo disciplinar é nula, na medida em que se baseou exclusivamente em denúncia anônima, o que fere o direito ao contraditório e ampla defesa.",
        C: "A demissão de Wagner é nula, pois o excesso de prazo na conclusão do processo administrativo disciplinar gera automaticamente a nulidade do processo.",
        D: "A instância administrativa é absolutamente dependente da instância penal. Portanto, enquanto não houver conclusão no âmbito penal, não poderá haver demissão na esfera administrativa."
      },
      gabarito: "A",
      anulada: false
    },
    // ──────────────────────────────────────────────
    // 40º EXAME DE ORDEM UNIFICADO
    // ──────────────────────────────────────────────
    {
      numero: 68,
      enunciado: "Determinada sociedade de advogados deseja se associar a advogados que não a integram para prestação de serviços e participação nos resultados. Segundo a legislação aplicável à formalização desse vínculo jurídico, assinale a opção que indica, corretamente, a conclusão dos administradores da sociedade de advogados.",
      alternativas: {
        A: "O contrato de associação não pode ser pactuado em caráter geral, devendo restringir-se a causas ou trabalhos específicos, sob pena de se configurarem os requisitos legais de vínculo empregatício.",
        B: "O contrato de associação deverá ser registrado no Conselho Seccional da OAB em cuja base territorial tiver sede a sociedade de advogados.",
        C: "O contrato de associação poderá atribuir a totalidade dos riscos à sociedade de advogados, mas não exclusivamente a um advogado sócio ou associado.",
        D: "O advogado não pode, simultaneamente, celebrar contrato de associação com mais de uma sociedade de advogados com sede ou filial na mesma área territorial do respectivo Conselho Seccional."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 69,
      enunciado: "Sebastião, advogado, celebrou contrato de mandato com o cliente Amir, para representá-lo extrajudicialmente, tendo realizado diligências em prol da resolução do imbróglio. Desde a celebração do mandato, passaram-se mais de 20 (vinte) anos, mas as atividades para as quais Amir contratou Sebastião, por sua própria natureza, se protraíram no tempo, sendo ainda necessárias a Amir. Sobre a hipótese apresentada, assinale a afirmativa correta.",
      alternativas: {
        A: "O mandato extinguiu-se pelo decurso do tempo, salvo se previsto prazo diverso no respectivo instrumento.",
        B: "O mandato extinguiu-se pelo decurso do tempo, sendo vedada a previsão de prazo diverso no respectivo instrumento.",
        C: "O mandato não se extinguiu pelo decurso do tempo, salvo se foi consignado prazo no respectivo instrumento.",
        D: "O mandato não se extinguiu pelo decurso do tempo, sendo vedada a estipulação de prazo no respectivo instrumento."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 70,
      enunciado: "Monique, advogada regularmente inscrita nos quadros da OAB, é investigada em inquérito policial por supostos crimes praticados por motivo ligado ao exercício da advocacia, tendo sido presa em flagrante, por crime da mesma espécie, em seu escritório, enquanto atendia a uma de suas clientes. Considerando as disposições do Estatuto da Advocacia, é correto afirmar que",
      alternativas: {
        A: "Monique tem direito à presença de representante da OAB para lavratura do auto de prisão em flagrante, visto que se trata de suposto crime por motivo ligado ao exercício da advocacia, sob pena de nulidade.",
        B: "Não há qualquer direito ou prerrogativa conferida pela legislação no caso em tela, devendo Monique receber tratamento idêntico ao dado a outros indivíduos não advogados, em razão do princípio da igualdade.",
        C: "A presença de representante da OAB no momento da lavratura do auto de prisão em flagrante será devida ainda que não se trate de motivo ligado ao exercício da advocacia, visto que se cuida de direito conferido ao advogado em todo e qualquer crime por ele cometido.",
        D: "O representante da OAB para acompanhar a lavratura do auto de prisão em flagrante, pode ser substituído por representante da Defensoria Pública, visto que ambos podem figurar como defensores."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 71,
      enunciado: "Pedro, contador com vasta experiência e sólida carreira, decide fazer uma segunda graduação, tornando-se bacharel em Direito. Depois da aprovação no Exame de Ordem Unificado e da inscrição nos quadros da Ordem dos Advogados do Brasil, Pedro pretende continuar prestando serviços contábeis, sem prejuízo do exercício concomitante da nova atividade. Acerca da intenção de Pedro, bem como dos limites ético-normativos para a publicidade profissional da sua nova atividade, assinale a afirmativa correta.",
      alternativas: {
        A: "Pedro não poderá exercer de modo concomitante as atividades de contador e advogado, pois, de acordo com o Estatuto da Advocacia e da OAB, a prestação de serviços contábeis é incompatível com o exercício simultâneo da advocacia.",
        B: "Não há óbice ético para o duplo exercício das atividades de contador e advogado, podendo Pedro se valer da divulgação conjunta dos serviços oferecidos, desde que não seja por meio de inscrições em muros, paredes, veículos, elevadores ou em qualquer espaço público.",
        C: "Embora não haja incompatibilidade para o exercício concomitante das duas atividades, não será permitido a Pedro divulgar sua nova profissão de modo conjunto com a de contador.",
        D: "Pedro poderá fazer uso de mala direta, distribuição de panfletos ou formas assemelhadas de publicidade, visando a captação de clientela para a sua nova atividade, mas não poderá mencionar, nessa publicidade, os serviços de contabilidade."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 72,
      enunciado: "Formalizou-se, no Tribunal Regional Eleitoral do Estado Alfa, a vacância de um dos cargos de juiz eleitoral, reservado constitucionalmente à classe de advogados. De igual modo, no Tribunal Regional Federal da Enésima Região, sediado na capital do mesmo Estado Alfa, com jurisdição nos Estados Alfa, Beta e Gama, foi também formalizada a vacância de um cargo de juiz federal do Tribunal Regional Federal, destinado à advocacia nos termos da Constituição Federal (quinto constitucional). Nesse hipotético cenário, que demandará a produção de duas listas de membros da advocacia para o futuro preenchimento dos cargos, assinale a afirmativa que descreve corretamente as competências dos órgãos da OAB.",
      alternativas: {
        A: "A lista para o preenchimento do cargo no TRE do Estado Alfa ficará sob a incumbência do Conselho Seccional da OAB do respectivo Estado, competindo ao Conselho Federal da OAB elaborar a lista para o preenchimento do cargo no TRF da Enésima Região.",
        B: "A lista para o preenchimento do cargo no TRE do Estado Alfa ficará sob a incumbência do Conselho Seccional da OAB do respectivo Estado, competindo aos Conselhos Seccionais da OAB dos Estados Alfa, Beta e Gama a elaboração conjunta da lista para o preenchimento do cargo no TRF da Enésima Região.",
        C: "Uma vez que tanto a Justiça Eleitoral quanto a Justiça Federal pertencem ao Poder Judiciário da União, competirá ao Conselho Federal da OAB a elaboração das duas listas.",
        D: "Uma vez que tanto o TRE do Estado Alfa quanto a sede do TRF da Enésima Região estão situados no Estado Alfa, competirá ao Conselho Seccional da OAB desse Estado a elaboração das duas listas."
      },
      gabarito: null,
      anulada: true
    },
    {
      numero: 73,
      enunciado: "Valmir, bacharel em Direito, aprovado no Exame da Ordem dos Advogados do Brasil, ocupa o cargo público de agente de Polícia Civil do Estado Alfa. Movido por sentimento altruísta, Valmir requer sua inscrição na OAB, pois pretende, nos momentos de folga da atividade policial, exercer a advocacia de forma gratuita, eventual e voluntária, em favor de instituições sociais sem fins econômicos que não disponham de recursos para a contratação de profissional. À luz dessas informações, e considerada a legislação vigente, assinale a afirmativa correta.",
      alternativas: {
        A: "Valmir poderá exercer regularmente a advocacia, inclusive pro bono.",
        B: "Valmir não poderá exercer a advocacia remunerada, pois ocupa cargo incompatível, mas poderá exercer a advocacia pro bono.",
        C: "Valmir não poderá exercer a advocacia, mesmo pro bono, uma vez que o cargo público que ocupa atrai o regime da incompatibilidade.",
        D: "A condição de servidor público atrai o regime do impedimento, razão pela qual Valmir não poderá exercer a advocacia contra a Fazenda Pública que o remunera. Observado esse impedimento, não haverá óbice para o exercício da advocacia pro bono."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 74,
      enunciado: "Mariângela, advogada trabalhista, foi intimada pelo juízo da Vara do Trabalho de sua cidade para comparecer à audiência una, designada para 16h15 de determinado dia. Por estar amamentando sua filha Manuela, recém-nascida, Mariângela protocolou petição nos autos do respectivo processo, requerendo preferência na ordem das audiências, mediante comprovação da sua condição. O juiz, contudo, indeferiu o pedido, com o argumento de que a causa é copatrocinada por uma segunda advogada, conforme procuração constante dos autos, a qual poderia participar do ato. A respeito da hipótese narrada, assinale a afirmativa correta.",
      alternativas: {
        A: "Diante da constatação de que há duas advogadas constituídas pela parte, e à míngua de previsão legal, a condição de lactante de Mariângela não é suficiente para o deferimento do pedido de preferência.",
        B: "Conquanto inexista previsão legal para o pedido formulado por Mariângela, o juiz deveria ter deferido o pleito com base na práxis judiciária e no princípio da razoabilidade.",
        C: "Apenas se Mariângela comprovasse ser a única patrona da causa, haveria previsão legal para que o pedido de preferência fosse atendido.",
        D: "Mariângela tem o direito de preferência assegurado em lei, independentemente de haver outra advogada constituída nos autos."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 75,
      enunciado: "Antônio Oliveira, advogado, cometeu infração disciplinar no exercício de suas funções, submetendo-se a processo disciplinar perante o Tribunal de Ética e Disciplina do Conselho Seccional competente. Antônio contratou o advogado Pedro para defendê-lo no âmbito do processo disciplinar. No que diz respeito à instauração, instrução e tramitação do processo disciplinar instaurado em face de Antônio, assinale a afirmativa correta que deverá ser observada por Pedro, no exercício da defesa técnica.",
      alternativas: {
        A: "O processo disciplinar poderá ser instruído por subseção ou por relatores do próprio Conselho Seccional.",
        B: "Antônio não poderá ser suspenso preventivamente sem oitiva prévia, mesmo que não atenda às notificações de comparecimento.",
        C: "O processo disciplinar não poderá ser instaurado de ofício, sob pena de violação do princípio acusatório.",
        D: "Oferecida a defesa prévia, o relator do processo disciplinar poderá decidir pelo arquivamento liminar da representação."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 76,
      enunciado: "“Portanto, a moralidade, e a humanidade enquanto capaz de moralidade, são as únicas coisas que têm dignidade.” Immanuel Kant. O artigo primeiro da Constituição Federal de 1988 determina que a dignidade da pessoa humana é fundamento da República. Filósofos e juristas há muito debatem o tema da dignidade. Sobre o tema, assinale a opção que apresenta a posição de Immanuel Kant, em seu livro Fundamentação da Metafísica dos Costumes.",
      alternativas: {
        A: "Aquele que pode participar dos destinos políticos da cidade é quem possui e exerce sua dignidade.",
        B: "Quando algo está acima de todo preço e, portanto, não permite equivalente, então ele tem dignidade.",
        C: "O amor à lei e à pátria conformam as bases da dignidade na vida social e política.",
        D: "A dignidade ocorre quando alguém possui elevada estima por si mesmo, mantendo seu amor próprio."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 77,
      enunciado: "Uma norma jurídica não vale porque tem um determinado conteúdo... (Hans Kelsen) O que faz uma norma jurídica ser válida é tema central para a teoria e a Filosofia do Direito. Segundo o Normativismo Jurídico de Hans Kelsen, conforme apresentado em seu livro Teoria Pura do Direito, a validade da norma jurídica recai logicamente sobre uma categoria que é o ponto de partida do processo de criação do direito positivo. Assinale a opção que apresenta essa categoria.",
      alternativas: {
        A: "O legislador democrático.",
        B: "A soberania popular.",
        C: "A norma fundamental pressuposta.",
        D: "O direito das gentes."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 78,
      enunciado: "O Supremo Tribunal Federal (STF), por dois terços de seus membros, aprovou de ofício, no último mês, a Súmula Vinculante XXX, que versa sobre matéria tributária. O deputado federal João da Silva mostrou-se preocupado com a referida Súmula, pois tramita no Congresso Nacional projeto de lei complementar cujo teor conflita fortemente com o da Súmula Vinculante XXX. Por desconhecer as consequências que a referida Súmula acarretará ao processo legislativo em andamento, João busca auxílio de sua assessoria jurídica. Sobre as consequências da Súmula Vinculante aprovada pelo STF, assinale a opção que apresenta, corretamente, a orientação recebida.",
      alternativas: {
        A: "Ela vincula unicamente os órgãos do Poder Judiciário, não atingindo os demais poderes, em respeito à separação de poderes.",
        B: "Ela não alcança o poder legiferante do Congresso Nacional, que segue mantendo intacta sua função originária de criação do Direito.",
        C: "Ela tem mera função diretiva e de orientação aos demais poderes, sem, no entanto, ter caráter impositivo para qualquer deles, incluindo o Poder Legislativo.",
        D: "Ela terá efeito vinculante em relação a todos os poderes, em todas as esferas, inclusive no que se refere ao poder de legislar dos entes federativos."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 79,
      enunciado: "Em uma cidade situada no município Gama, José Silva sofreu grave acidente ao ser atropelado por um caminhão. Com lesões pelo corpo, ele foi conduzido ao hospital municipal situado na cidade e, ao passar pelo setor de identificação, alegou não possuir consigo qualquer documento. Na dúvida sobre se José poderia ter acesso aos serviços de saúde do SUS (Sistema Único de Saúde), a direção do hospital consultou a Procuradoria do Município. Sobre o caso apresentado, em consonância com o sistema jurídico-constitucional brasileiro, assinale a afirmativa que apresenta a resposta correta.",
      alternativas: {
        A: "Para fazer jus aos serviços de saúde ofertados pelo SUS, José deve comprovar a condição de contribuinte do sistema previdenciário brasileiro.",
        B: "Para fazer jus aos serviços de saúde ofertados pelo SUS, José deve comprovar, formalmente, a condição de trabalhador.",
        C: "Os serviços de saúde ofertados pelo SUS somente são disponibilizados para os brasileiros natos ou naturalizados.",
        D: "O atendimento pelo SUS deve ser realizado, independentemente de José possuir nacionalidade brasileira, ser trabalhador ou contribuir com a Previdência Social."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 80,
      enunciado: "Depois da ocorrência de calamidade de grandes proporções, em razão de enchentes causadas por chuvas cuja intensidade foi classificada como “sem precedentes”, o Presidente da República vislumbra a possível necessidade de decretação de estado de defesa para combater o quadro caótico no qual se encontram quatro estados de uma determinada região do país. Depois de visitar o local, ele tem dúvidas acerca do prazo de duração da medida e, por isso, submete a proposta à apreciação de sua assessoria jurídica. Assinale a afirmativa que, em consonância com o sistema jurídico-constitucional brasileiro, deve ser adotada",
      alternativas: {
        A: "O Presidente da República tem poder discricionário para definir o prazo de duração, desde que haja aprovação prévia do Congresso Nacional.",
        B: "O tempo de duração não será superior a 30 (trinta) dias, podendo ser prorrogado uma vez, por igual período, se persistirem as razões que justificaram a sua decretação.",
        C: "O tempo para a superação da crise que deu origem à decretação pelo Presidente da República não pode ultrapassar uma sessão legislativa.",
        D: "O tempo de duração será definido discricionariamente, em respeito ao princípio da separação de poderes, pelo Congresso Nacional."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 81,
      enunciado: "O Presidente da República almeja apresentar ao Poder Legislativo um projeto de lei sobre cidadania, além de obter rapidamente a sua aprovação. Com isso, quer cumprir uma promessa realizada durante sua campanha eleitoral. Por essa razão, consulta o Advogado-Geral da União para saber qual é a correta orientação constitucional a ser observada para a concretização do seu objetivo. Com base na situação hipotética narrada e no sistema jurídico-constitucional brasileiro, assinale a opção que indica, corretamente, a resposta apresentada pelo Advogado-Geral da União.",
      alternativas: {
        A: "Edição de medida provisória, para que a iniciativa pudesse produzir efeitos rapidamente, devendo-se lembrar ainda que, por essa via, imediatamente ficaria trancada a pauta do Congresso Nacional para deliberar sobre outra matéria.",
        B: "Apresentação de projeto de lei na Câmara dos Deputados com pedido de urgência, sendo que, por essa via, cada Casa do Congresso Nacional, sucessivamente, tem até 45 (quarenta e cinco) dias para deliberar sobre a proposta, sob o risco de sobrestamento das demais deliberações.",
        C: "Solicitação à base de apoio do Executivo no âmbito do Congresso Nacional para que inicie o processo legislativo de uma Emenda Constitucional, pois, só assim, ele poderia solicitar urgência para a deliberação da proposta nas Casas Legislativas.",
        D: "Requerimento, ao Congresso Nacional, de delegação para elaboração de lei delegada, pois, assim, ele não teria emendas ao seu projeto e, imediatamente, a lei produziria seus efeitos."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 82,
      enunciado: "Determinada associação nacional, que congrega oficiais do registro e notários, foi surpreendida com a publicação da Lei Federal X, que mudou a destinação dos emolumentos cartorários, de modo que uma parte dos valores arrecadados passaria a ser destinada a políticas públicas do governo federal na área de educação. Considerando a iminente perda de arrecadação, a associação procura você, na qualidade de advogado(a), para saber da constitucionalidade da Lei Federal X. Com base na hipótese narrada e no sistema jurídico-constitucional brasileiro, assinale a opção que apresenta, corretamente, o seu parecer.",
      alternativas: {
        A: "Não há inconstitucionalidade na Lei Federal X, pois os emolumentos cartorários, por serem recursos públicos, devem ter a destinação que lhe é atribuída em lei.",
        B: "A Lei Federal X é inconstitucional, pois vincula a destinação dos emolumentos cartorários a finalidade diversa daquela prevista na ordem constitucional.",
        C: "A Lei Federal X é coerente com o sistema constitucional, pois mudou a destinação dos emolumentos cartorários apenas no âmbito da União.",
        D: "Os emolumentos cartorários devem ser direcionados ao custeio da seguridade social, logo, a Lei Federal X afronta a ordem constitucional."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 83,
      enunciado: "Uma Proposta de Emenda à Constituição (PEC) é apresentada por um grupo de deputados federais, conforme autoriza a ordem constitucional, cujo objeto é a alteração do Art. 60, § 4º, inciso II, da CRFB/88, que passaria a ter a seguinte redação: o voto direto, aberto, universal e periódico. Depois de apertada aprovação nas comissões competentes, os autores da proposta solicitaram ao Presidente da Câmara dos Deputados que colocasse a referida PEC na pauta do plenário da Casa Legislativa, o que foi atendido. Paralelamente, outro grupo de parlamentares, ao perceber que, pela movimentação política, a PEC possivelmente seria aprovada, procura uma ação jurídica para impedir tal votação pelo plenário da Casa. A respeito da ação jurídica capaz de impedir tal votação pelo plenário da Casa, segundo o sistema brasileiro de controle de constitucionalidade, assinale a afirmativa correta.",
      alternativas: {
        A: "Em razão da afronta à cláusula pétrea do voto secreto, qualquer legitimado a deflagar o controle concentrado de constitucionalidade pode ajuizar uma Ação Direta de Inconstitucionalidade (ADI) perante o Supremo Tribunal Federal.",
        B: "Como se está perante matéria interna corporis do Congresso Nacional, que só pode ser apreciada no âmbito do Poder Legislativo, a referida PEC, enquanto não for promulgated e se transformar em ato normativo existente e eficaz, não pode ser objeto de nenhum tipo de controle pelo Poder Judiciário.",
        C: "Por afronta a preceito fundamental, um legitimado pode ajuizar Arguição de Descumprimento de Preceito Fundamental (ADPF) perante o Supremo Tribunal Federal, nos termos da Constituição da República.",
        D: "Em razão da inobservância das limitações constitucionais materiais ao poder de emendar a Constituição, qualquer deputado federal tem legitimidade ativa para impetrar mandado de segurança perante o Supremo Tribunal Federal."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 84,
      enunciado: "Os conflitos armados, infelizmente, são uma realidade que afeta diferentes países. As quatro Convenções de Genebra de 1949 conformam a base do Direito Internacional Humanitário. Em comum às quatro Convenções está o Art. 3º que, entre outros dispositivos, determina o tratamento humano para todos os indivíduos em poder do inimigo, sem nenhuma distinção adversa. Proíbe, especialmente, os assassinatos, as mutilações, as torturas e os tratamentos cruéis, humilhantes e degradantes, a tomada de reféns e os julgamentos parciais. Sobre esse artigo, assinale a afirmativa correta.",
      alternativas: {
        A: "Abrange também as situações de conflito armado sem caráter internacional e que surjam no território de um Estado-parte da Convenção.",
        B: "Determina a obrigatoriedade de cessar-fogo, no caso de início de uma rodada de negociações para a busca de solução não armada do conflito.",
        C: "Atribui ao Conselho de Segurança da ONU a competência para julgar a legitimidade da guerra e as eventuais sanções a serem impostas às partes do conflito.",
        D: "Prevê a instituição de um tribunal específico para o julgamento de acusados de terem cometido crimes de guerra pela Assembleia-Geral das Nações Unidas."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 85,
      enunciado: "STJ transfere à Justiça Federal apuração da morte de líderes de trabalhadores rurais em Rondônia. A pedido da Procuradoria-Geral da República (PGR), a Terceira Seção do Superior Tribunal de Justiça (STJ) determinou a transferência, para a Justiça Federal, de seis inquéritos relativos a crimes de homicídio praticados contra líderes de trabalhadores rurais e outras pessoas que denunciaram grilagem de terras e exploração ilegal de madeira em Rondônia. (Notícias do STJ – 25/08/2023). A notícia acima, informada no site do STJ, diz respeito a um instituto exclusivo para a proteção dos Direitos Humanos previsto na Constituição Federal/88. Assinale a opção que o indica.",
      alternativas: {
        A: "Arguição de Descumprimento de Preceito Fundamental.",
        B: "Incidente de Deslocamento de Competência.",
        C: "Tese com Repercussão Geral.",
        D: "Ação Popular."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 86,
      enunciado: "Entre os correligionários do partido político Alfa estavam dois dos pré-candidatos considerados favoritos na eleição para governador do Estado Beta. Como somente um deles poderia ser escolhido por Alfa para concorrer ao referido cargo eletivo, houve grande interesse dos meios de comunicação social na cobertura das prévias partidárias. Em relação às emissoras de rádio e televisão, à luz dos balizamentos legais existentes, assinale a afirmativa correta.",
      alternativas: {
        A: "A lei obsta a cobertura das prévias partidárias.",
        B: "Elas podem realizar, ao vivo ou não, a plena cobertura das prévias partidárias, não sendo permitida qualquer censura.",
        C: "Somente é permitida a transmissão de imagens ao vivo, de modo a evitar o risco de trucagem.",
        D: "As transmissões por emissoras de rádio e televisão das prévias partidárias, ao vivo, são vedadas."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 87,
      enunciado: "João, candidato ao cargo eletivo de prefeito municipal, logrou ser eleito. No entanto, por ser muito desorganizado, não conseguiu localizar os documentos necessários para a prestação de contas à Justiça Eleitoral, o que resultou na não apresentação dessas contas. Sobre as consequências da omissão de João, assinale a afirmativa correta.",
      alternativas: {
        A: "A impossibilidade de ser diplomado.",
        B: "A sua diplomação com reservas.",
        C: "O pagamento de multa, não havendo óbice à diplomação, ato independente.",
        D: "A necessidade de firmar compromisso, previamente à diplomação, comprometendo-se a apresentar as contas."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 88,
      enunciado: "Uma sociedade empresária colombiana celebrou, na Inglaterra, com uma sociedade alemã, um contrato para a entrega de 500 (quinhentas) sacas de café tipo arábica no Porto de Santos, Brasil, sem cláusula de eleição de foro exclusivo. Durante o transporte, houve um acidente com a embarcação, que acarretou o perecimento da mercadoria. Você, como advogado(a), é procurado(a) para ajuizar a presente ação. De acordo com o direito internacional privado brasileiro, assinale a opção que indica a autoridade judiciária competente para processar e julgar eventual demanda entre as contratantes.",
      alternativas: {
        A: "A autoridade judiciária inglesa, única e exclusivamente.",
        B: "A autoridade judiciária colombiana, concorrentemente.",
        C: "A autoridade judiciária alemã, única e exclusivamente.",
        D: "A autoridade judiciária brasileira, concorrentemente."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 89,
      enunciado: "A Fundação de Juristas Moçambique–Brasil, associação privada de fim de interesse coletivo, constituiu-se na década de 1990, na cidade de Maputo, capital de Moçambique, e pretende abrir filial no Brasil. Você, advogado(a) especializado em Direito Internacional, é procurado pela Fundação para avaliar a pretensão do caso em tela. Sobre a hipótese apresentada, assinale a afirmativa correta.",
      alternativas: {
        A: "A Fundação não poderá ter filial no Brasil, salvo se houver prévia decisão da justiça brasileira autorizativa.",
        B: "A Fundação não poderá ter filial no Brasil, antes da aprovação dos atos constitutivos pelo governo brasileiro, ficando a filial sujeita à lei brasileira.",
        C: "A Fundação não poderá ter filial no Brasil, salvo se houver prévia autorização legislativa do Congresso Nacional.",
        D: "A Fundação não poderá ter filial no Brasil, antes da aprovação dos atos constitutivos pelo governo moçambicano, ficando a filial sujeita à lei moçambicana."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 90,
      enunciado: "O Presidente da República se quedou inerte quanto à elaboração e ao envio do projeto de Lei Orçamentária Anual (LOA) da União para aprovação do Congresso Nacional no prazo estabelecido pela CRFB/88. O Presidente do Congresso Nacional, então, assumiu a responsabilidade de elaboração de um novo projeto de LOA e de envio para tramitação e aprovação de ambas as Casas do Congresso Nacional. Nesse caso, é correto afirmar que:",
      alternativas: {
        A: "Caso aprovada, a referida LOA será inconstitucional por vício de iniciativa, já que é de competência privativa do Presidente da República sua elaboração e seu envio ao Congresso Nacional, não podendo o Presidente do Congresso Nacional realizar tal elaboração nem mesmo em caráter excepcional.",
        B: "Comprovada a inércia do Presidente da República, admite-se, de forma subsidiária, que a iniciativa do referido projeto de LOA seja exercida por pessoa diversa, a exemplo do Presidente do Congresso Nacional.",
        C: "Quando o Presidente da República deixa de apresentar o projeto de LOA da União no prazo legal, a CRFB/88 prevê a possibilidade de o Poder Judiciário, o Ministério Público, a Defensoria Pública e o Poder Legislativo apresentarem, autonomamente, seus respectivos projetos de orçamentos para tramitação no Congresso Nacional.",
        D: "A referida LOA somente não será inconstitucional, por vício de iniciativa, caso sua aprovação se dê pelo processo legislativo de aprovação de lei complementar, uma vez que, por se tratar de hipótese excepcional, a Constituição Federal de 1988 prevê um maior rigor para sua aprovação."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 91,
      enunciado: "A Escolinha do Gol, entidade privada sem fins lucrativos, que realiza sua função social de fomento ao esporte no Município Alfa, Estado Beta, entre os anos de 2020 a 2022, recebeu diretamente da União a quantia de R$ 100.000,00 (cem mil reais) para financiar seu programa beneficente de ensino e treinamento de futebol para crianças carentes da localidade. Pedro, administrador da instituição e técnico de futebol da escolinha, recebeu, em janeiro de 2023, uma notificação do Tribunal de Contas da União (TCU) intimando a instituição a prestar contas dos recursos recebidos no prazo de 30 (trinta) dias, sob pena da imediata devolução, acrescida de juros, correção monetária e multa. Tendo Pedro aplicado 100% dos recursos recebidos nas atividades da escolinha, contrata você, como advogado, para orientá-lo sobre a notificação. Diante desse cenário, assinale a opção que apresenta sua orientação.",
      alternativas: {
        A: "Por não se tratar de uma entidade pública, e sim de uma instituição privada, não se submete à fiscalização e ao controle de qualquer Tribunal de Contas.",
        B: "Não pode o TCU fiscalizar e controlar tais repasses, cabendo apenas ao Tribunal de Contas do Estado Beta, por ser o Município Alfa destinatário e efetivo usuário de tais recursos repassados.",
        C: "É devida a prestação de contas de qualquer pessoa física ou jurídica, pública ou privada que receba e utilize dinheiro público.",
        D: "Apenas deverão prestar contas dos recursos públicos recebidos aqueles que os aplicarem em atividade diversa da originalmente estabelecida ou que não os tenham aplicado integralmente."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 92,
      enunciado: "A sociedade empresária Books & Books Ltda., verificando a queda na receita de venda de livros impressos e o fechamento de inúmeras outras livrarias locais, decide alterar seu negócio para importação e comercialização no mercado interno de livros eletrônicos acompanhados dos respectivos aparelhos exclusivamente leitores. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "A importação de tais livros eletrônicos e seus respectivos aparelhos leitores por Books & Books Ltda. fica imune da incidência do Imposto de Importação.",
        B: "A comercialização no mercado interno de tais livros eletrônicos por Books & Books Ltda. é imune da incidência de Imposto sobre Circulação de Mercadorias, mas não é imune da incidência deste tributo estadual na comercialização de seus respectivos aparelhos leitores.",
        C: "Embora tais livros eletrônicos e seus respectivos aparelhos leitores importados e comercializados no mercado interno por Books & Books Ltda. sejam equiparados a livros, o Imposto de Importação e o Imposto sobre Circulação de Mercadorias, por serem tributos indiretos, não podem ser alcançados por essa imunidade.",
        D: "Os livros eletrônicos e seus respectivos aparelhos leitores importados e comercializados por Books & Books Ltda. não podem ser equiparados a livros, razão pela qual não incide qualquer imunidade sobre a importação ou a comercialização deles no mercado interno."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 93,
      enunciado: "Para conter a escalada de preços dos combustíveis que vem afetando a economia nacional, a equipe econômica do governo federal estuda a possibilidade de conceder, mediante lei complementar editada exclusivamente para tal fim, uma isenção temporária de um ano sobre todos os tributos federais e estaduais incidentes sobre os combustíveis (petróleo e derivados), atendendo aos requisitos das leis orçamentárias. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "A concessão de tal isenção, mediante lei complementar, de caráter nacional, exclusivamente para este fim é admitida pela Constituição Federal.",
        B: "Sendo tal benefício fiscal apenas temporário, pode ser excepcionalmente admitido por ter, como causa, uma situação extraordinária de interesse nacional.",
        C: "Tal lei afronta a Constituição Federal ao atingir tributos de competência estadual.",
        D: "A competência tributária é privativa da Agência Nacional de Petróleo (ANP) quanto à tributação de combustíveis, e tal lei acaba por violá-la."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 94,
      enunciado: "João e José decidem constituir uma sociedade empresária, denominada Informática ABC Ltda., especializada na prestação de serviços na área de informática. João integralizou 50% do capital social da sociedade com dinheiro, e José integralizou os seus 50% com um imóvel de sua propriedade localizado no Município Alfa, a ser utilizado como sede da empresa. Dois anos depois do início das atividades da sociedade empresária, José recebe uma notificação da Secretaria de Fazenda do Município Alfa, por falta de pagamento do Imposto sobre a Transmissão de Bens Imóveis (ITBI), devido no ato da integralização do capital social da empresa, por ser ele, segundo a legislação local, o contribuinte deste imposto. Diante desse cenário, assinale a afirmativa correta.",
      alternativas: {
        A: "José é responsável solidário pelo recolhimento do ITBI incidente sobre essa transmissão.",
        B: "As empresas do setor de informática, por expressa disposição de lei complementar nacional, estão isentas do pagamento de ITBI.",
        C: "É devida a cobrança do ITBI, uma vez que houve a transmissão da propriedade do imóvel de José para a empresa Informática ABC Ltda. no ato da integralização do capital social.",
        D: "O ITBI não incide sobre a transmissão de bens incorporados ao patrimônio de Informática ABC Ltda., em realização de capital."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 95,
      enunciado: "Determinado país declarou guerra ao Brasil. Para fazer frente aos gastos com o esforço de guerra, a União resolveu criar, por lei federal ordinária, um imposto extraordinário de guerra, com a mesma hipótese de incidência do Imposto sobre a Transmissão Causa Mortis e Doações. A alíquota fixada pela lei federal era de 1% sobre o valor da doação ou do montante transmitido causa mortis. Sobre esse imposto extraordinário, assinale a afirmativa correta.",
      alternativas: {
        A: "Não pode ser criado, pois viola a competência tributária dos Estados e do Distrito Federal.",
        B: "Como apresenta hipótese de incidência idêntica à do imposto estadual, somente poderia ser criado por lei complementar.",
        C: "Configura hipótese de bitributação ilegal, razão pela qual não poderia ser admitido.",
        D: "É válido, mas deve ser suprimido, gradativamente, cessadas as causas de sua criação."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 96,
      enunciado: "O Município Alfa pretende firmar convênio com a União para fiscalizar e arrecadar diretamente o Imposto sobre a Propriedade Territorial Rural (ITR) dos imóveis rurais situados em seu território. Acerca dessa pretensão municipal, assinale a afirmativa correta.",
      alternativas: {
        A: "Tal convênio, caso firmado, configura um exemplo de transferência de competência tributária plena da União para o Município.",
        B: "Caso firme tal convênio, o Município Alfa terá direito a ficar com 100% do ITR arrecadado referente aos imóveis rurais situados em seu território.",
        C: "Tal convênio é legalmente vedado por configurar delegação de capacidade tributária ativa.",
        D: "O Município Alfa pode receber delegação para arrecadar o tributo, mas sua fiscalização é privativa de agentes da Administração Tributária Federal."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 97,
      enunciado: "Marcelo, servidor público federal estável, aposentou-se por invalidez. Meses depois, uma junta médica oficial declarou insubsistentes os motivos de sua aposentadoria. Consoante a Lei nº 8.112/90, que dispõe sobre o regime jurídico dos servidores públicos civis da União, o retorno de Marcelo à atividade, por meio de provimento de cargo público derivado por reingresso, se dará pela",
      alternativas: {
        A: "reintegração, que se dará no cargo anteriormente ocupado ou no cargo resultante de sua transformação. Na hipótese de o cargo ter sido extinto, Marcelo ficará em disponibilidade.",
        B: "recondução, que ocorrerá no mesmo cargo de origem e, encontrando-se provido o cargo, Marcelo será aproveitado em outro.",
        C: "reversão, que se fará no mesmo cargo ou no cargo resultante de sua transformação e, encontrando-se provido o cargo, Marcelo exercerá suas atribuições como excedente, até a ocorrência de vaga.",
        D: "readaptação, que se realizará em cargo de atribuições afins ao cargo originário de Marcelo, respeitada a habilitação exigida, o nível de escolaridade e a equivalência de vencimento."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 98,
      enunciado: "O Ministério Público Federal ajuizou ação buscando a responsabilização judicial da Sociedade Empresária Delta pela prática de atos lesivos à Administração Pública que atentaram contra o patrimônio público nacional. Na inicial, imputa-se à citada pessoa jurídica a prática de atos que dificultaram atividade de fiscalização de órgãos públicos federais e intervieram na atuação desses órgãos, inclusive no âmbito de órgãos de fiscalização do sistema financeiro nacional. A diretoria da Sociedade Empresária Delta, preocupada com eventual possibilidade de sanção judicial de dissolução compulsória da pessoa jurídica, contratou você como advogado(a) especializado na matéria. Diante das circunstâncias do caso concreto e com base na Lei Anticorrupção (Lei nº 12.846/2013), sobre a dissolução compulsória da pessoa jurídica assinale a afirmativa correta.",
      alternativas: {
        A: "Não é sanção prevista pela prática de atos lesivos à Administração Pública, mas pode ser aplicada em eventual ação de improbidade administrativa.",
        B: "É medida extrema que somente pode ser decretada pelo Supremo Tribunal Federal, quando houver risco concreto de comprometimento do sistema financeiro nacional ou da soberania nacional.",
        C: "Não existe no ordenamento jurídico brasileiro, em razão da função social da sociedade empresária e da livre concorrência, e a sanção máxima aplicável seria a suspensão ou interdição parcial de suas atividades.",
        D: "É determinada quando for comprovado que a personalidade jurídica foi utilizada de forma habitual para facilitar ou promover a prática de atos ilícitos, ou foi constituída para ocultar ou dissimular interesses ilícitos ou a identidade dos beneficiários dos atos praticados."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 99,
      enunciado: "Vicente, servidor público federal estável, praticou conduta que corresponde a crime, na forma da legislação penal, e se enquadra como falta funcional grave, passível de demissão. Ao tomar conhecimento de tal situação, a Administração determinou a instauração de processo administrativo disciplinar, com a designação da Comissão processante, composta por três servidores ocupantes de cargos efetivos, sendo certo que um deles, Alípio, ainda não alcançou a estabilidade. Paralelamente, o Juízo criminal competente recebeu denúncia em desfavor de Vicente em razão dos mesmos fatos. Considerando os dados apresentados, Vicente procurou você, como advogado(a), para esclarecer dúvidas acerca da mencionada situação. Assinale a opção que apresenta a orientação jurídica que, corretamente, você prestou.",
      alternativas: {
        A: "O processo administrativo disciplinar em face de Vicente não poderia ser instaurado, na medida em que a sua responsabilização deve se restringir à esfera criminal.",
        B: "A nomeação de Alípio para compor a comissão processante do processo administrativo disciplinar não é válida.",
        C: "O recebimento da denúncia em desfavor de Vicente suspende a apuração levada a efeito em sede de processo administrativo disciplinar.",
        D: "Eventual sentença absolutória na ação penal deverá repercutir em demissão de Vicente, ainda que fundada na ausência de provas."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 100,
      enunciado: "A sociedade empresária Sabiá tomou conhecimento de um edital de licitação elaborado pelo Município Alfa para promover a permissão de determinado serviço público de competência local, razão pela qual procura sua assessoria jurídica, a fim de dirimir algumas dúvidas acerca da mencionada modalidade de delegação. Acerca das peculiaridades da permissão de serviços públicos, à luz do disposto na CRFB/88 e na Lei nº 8.987/95, assinale a afirmativa correta.",
      alternativas: {
        A: "A modalidade licitatória deverá ser necessariamente aquela designada como diálogo competitivo.",
        B: "Não é necessária a realização de licitação para a formalização da delegação pretendida pelo Município Alfa.",
        C: "É necessária a constituição de uma sociedade de propósito específico para a formalização do respectivo contrato.",
        D: "A delegação pretendida poderá ser realizada para pessoa física ou jurídica que demonstre capacidade para a prestação do serviço por sua conta e risco."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 101,
      enunciado: "Jamile, após aprovação em concurso público, foi investida em cargo efetivo na Secretaria de Administração do Estado Alfa, no qual alcançou a estabilidade. No entanto, o mencionado ente federativo decidiu reformular o seu quadro de pessoal, de modo que, após o devido processo legislativo, fez publicar a Lei XYZ que extinguiu a carreira e, consequentemente, o cargo efetivo ocupado por Jamile, e, em razão disso, ato contínuo, promoveu sua exoneração. Diante dessa situação hipotética, à luz das disposições constitucionais acerca dos servidores públicos, assinale a afirmativa correta.",
      alternativas: {
        A: "Jamile não pode ser afetada pela alteração legislativa em comento, pois possui o direito adquirido de permanecer no cargo para o qual foi aprovada em concurso.",
        B: "O Estado Alfa deve promover o aproveitamento de Jamile em outro cargo, ainda que com atribuições e remuneração distintas daquele para o qual ela fora aprovada em concurso.",
        C: "A exoneração de Jamile revela-se adequada e pertinente, diante da extinção da carreira e do cargo efetivo que ocupava pela Lei XYZ.",
        D: "Jamile, em razão da extinção do cargo, deve ficar em disponibilidade, com remuneração proporcional ao tempo de serviço, até o seu adequado aproveitamento em outro cargo."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 102,
      enunciado: "A sociedade empresária Gama requereu licença ambiental para empreender um aterro sanitário. O processo de licenciamento ambiental tramita no órgão licenciador competente. No curso do procedimento, observadas as cautelas legais necessárias, o licenciador deferiu licença na fase inicial do planejamento do empreendimento, aprovando sua localização e concepção, atestando a viabilidade ambiental e estabelecendo os requisitos básicos e condicionantes a serem atendidos nas próximas fases de sua implementação. Registre-se que tal licença foi deferida isoladamente, diante da natureza, das características e da fase do empreendimento. O caso em tela, de acordo com a Resolução CONAMA nº 237/1997, trata de licença",
      alternativas: {
        A: "prévia, que será sucedida, na próxima etapa do licenciamento, pela licença de instalação, que autorizará a instalação do empreendimento de acordo com as especificações constantes dos planos, programas e projetos aprovados.",
        B: "de instalação, que será sucedida, na próxima etapa do licenciamento, pela licença de operação, que autorizará a operação da atividade ou do empreendimento, após a verificação do efetivo cumprimento do que consta das licenças anteriores, com as medidas de controle ambiental e os condicionantes determinados para a operação.",
        C: "de funcionamento, que foi precedida pela licença ambiental simplificada, que autorizará o início dos estudos ambientais, em especial, a elaboração do estudo prévio de impacto ambiental e seu correlato relatório de impacto ambiental.",
        D: "de operação, que foi precedida pela licença de instalação, que autorizará a execução das medidas mitigatórias previstas no estudo de impacto ambiental e a instalação do empreendimento de acordo com as especificações constantes dos planos, programas e projetos aprovados."
      },
      gabarito: "A",
      anulada: false
    },
    // ──────────────────────────────────────────────
    // XIV EXAME DE ORDEM UNIFICADO
    // ──────────────────────────────────────────────
    {
      numero: 103,
      enunciado: "Matheus é estagiário vinculado ao escritório Renato e Associados. No exercício da sua atividade, por ordem do advogado supervisor, o estagiário acompanha o cliente diretor da sociedade Tamoaí S/A. Por motivos alheios à vontade do estagiário, que se disse inocente de qualquer deslize, o diretor veio a se desentender com Matheus, e, por força desse evento, o escritório resolve renunciar ao mandato conferido pela pessoa jurídica. Nos termos do Estatuto da Advocacia, sobre o caso descrito, assinale a afirmativa correta.",
      alternativas: {
        A: "O advogado pode afastar-se do processo em que atua sem comunicação ao cliente.",
        B: "A renúncia deve ser notificada ao cliente pelos advogados mandatários.",
        C: "A renúncia aos poderes conferidos no mandato dependerá do cliente do escritório.",
        D: "A renúncia ao mandato, sem respeitar o prazo legal, implica abandono da causa."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 104,
      enunciado: "Andrea e Luciano trocam missivas intermitentes, cujo conteúdo diz respeito a processo judicial em que a primeira é autora, e o segundo, seu advogado. A parte contrária, ciente da troca de informações entre eles, requer ao Juízo que esses documentos sejam anexados aos autos do processo em que litigam. Sob a perspectiva do Código de Ética e Disciplina da Advocacia, as comunicações epistolares trocadas entre advogado e cliente",
      alternativas: {
        A: "constituem documentos públicos a servirem como prova em Juízo.",
        B: "são presumidas confidenciais, não podendo ser reveladas a terceiros.",
        C: "podem ser publicizadas, de acordo com a prudência do advogado.",
        D: "devem ser mantidas em sigilo até o perecimento do advogado."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 105,
      enunciado: "O advogado Antônio de Souza encontra-se preso cautelarmente, em cela comum, por força de decreto de prisão preventiva proferido no âmbito de ação penal a que responde por suposta prática de reiteradas fraudes contra a Previdência. O advogado de Antônio requereu ao magistrado que decretou a prisão a transferência de seu cliente para sala de estado-maior. Como não havia sala de estado-maior disponível na localidade, o magistrado determinou que Antônio deveria permanecer em prisão domiciliar até que houvesse sala de estado-maior disponível. Sobre a decisão do magistrado, assinale a opção correta.",
      alternativas: {
        A: "O magistrado decidiu corretamente, pois, de acordo com o EAOAB, é direito do advogado não ser recolhido preso, antes de sentença transitada em julgado, senão em sala de Estado-maior e, na sua falta, em prisão domiciliar.",
        B: "O magistrado não decidiu corretamente, pois o advogado, assim como qualquer outro cidadão que tenha concluído curso superior, tem direito a ser recolhido preso em prisão especial, mas não em sala de estado-maior, que apenas é garantida a magistrados e membros do Ministério Público.",
        C: "O magistrado decidiu corretamente, devendo o advogado permanecer em prisão domiciliar, mesmo havendo sala de Estado Maior, após eventual trânsito em julgado de sua condenação.",
        D: "O magistrado não decidiu corretamente, pois o advogado apenas tem direito a não ser recolhido preso, antes de sentença transitada em julgado, em sala de estado-maior e, na sua falta, em prisão domiciliar, quando o crime que lhe esteja sendo imputado decorra do exercício regular da profissão de advogado."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 106,
      enunciado: "Ao requerer sua inscrição nos quadros da OAB, Maria assinou e apresentou declaração em que afirmava não exercer cargo incompatível com a advocacia. No entanto, exercia ela ainda o cargo de Oficial de Justiça no Tribunal de Justiça do seu Estado. Pouco tempo depois, já bem sucedida como advogada, pediu exoneração do referido cargo. No entanto, um desafeto seu, tendo descoberto que Maria, ao ingressar nos quadros da OAB, ainda exercia o cargo de Oficial de Justiça, comunicou o fato à entidade, que abriu processo disciplinar para apuração da conduta de Maria, tendo ela sido punida por ter feito falsa prova de um dos requisitos para a inscrição na OAB. De acordo com o EAOAB, assinale a opção que indica a penalidade que deve ser aplicada a Maria.",
      alternativas: {
        A: "Maria não deve ser punida porque, ao tempo em que os fatos foram levados ao conhecimento da OAB, ela já não mais exercia cargo incompatível com a advocacia.",
        B: "Maria não deve ser punida porque o cargo de Oficial de Justiça não é incompatível com o exercício da advocacia, não tendo Maria, portanto, feito prova falsa de requisito para inscrição na OAB.",
        C: "Maria deve ser punida com a pena de suspensão, pelo prazo de trinta dias.",
        D: "Maria deve ser punida com a pena de exclusão dos quadros da OAB."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 107,
      enunciado: "Cláudia, advogada, inicialmente transitou pelo direito privado, com assunção de causas individuais e coletivas. Ao ser contratada por uma associação civil, deparou com questões mais pertinentes ao direito público e, por força disso, realizou novos estudos e contatou colegas mais experientes na matéria. Ao aprofundar suas relações jurídicas, também iniciou participação política na defesa de temas essenciais à cidadania. Por força disso, Cláudia foi eleita prefeita do município X em eleição bastante disputada, tendo vencido seu oponente, o também advogado Pradel, por apenas cem votos. Eleita e empossada, motivada pelo sentido conciliatório, convidou seu antigo oponente para ocupar cargo em comissão na Secretaria Municipal de Fazenda. A partir da hipótese apresentada, observadas as regras do Estatuto da OAB, assinale a opção correta.",
      alternativas: {
        A: "A prefeita exerce função incompatível com a advocacia.",
        B: "O secretário municipal pode atuar em ações contra o município.",
        C: "A prefeita deve pedir autorização para exercer a advocacia.",
        D: "O secretário municipal pode atuar em pleitos contra o Estado federado."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 108,
      enunciado: "Às 15h15, o advogado Armando aguardava, no corredor do fórum, o início de uma audiência criminal designada para as 14h30. A primeira audiência do dia havia sido iniciada no horário correto, às 13h30, e a audiência da qual Armando participaria era a segunda da pauta daquela data. Armando é avisado por um serventuário de que a primeira audiência havia sido interrompida por uma hora para que o acusado, que não se sentira bem, recebesse atendimento médico, e que, por tal motivo, todas as demais audiências do dia seriam iniciadas com atraso. Mesmo assim, Armando informa ao serventuário que não iria aguardar mais, afirmando que, de acordo com o EAOAB, tem direito, após trinta minutos do horário designado, a se retirar do recinto onde se encontre aguardando pregão para ato judicial. A partir do caso apresentado, assinale a opção correta.",
      alternativas: {
        A: "Armando poderia se retirar do recinto, pois o advogado tem o direito de não aguardar por mais de trinta minutos para a realização de ato judicial.",
        B: "Armando não poderia se retirar do recinto, pois a autoridade que presidiria o ato judicial do qual Armando participaria estava presente.",
        C: "Armando não poderia se retirar do recinto, pois a prerrogativa por ele invocada não é válida para audiências criminais.",
        D: "Armando poderia se retirar do recinto, pois não deu causa ao atraso da audiência."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 109,
      enunciado: "O estagiário Marcos trabalha em determinado escritório de advocacia e participou ativamente da elaboração de determinada peça processual que estava para ser analisada pelo magistrado da Vara em que o processo tramitava, assinando, ao final, a petição, em conjunto com alguns advogados do escritório. Como conhecia muito bem a causa, resolveu falar com o magistrado com o objetivo de ressaltar, de viva voz, alguns detalhes relevantes. Quando o magistrado percebeu que estava recebendo o estagiário do escritório, e não um dos advogados que atuava na causa, informou ao estagiário que não poderia tratar com ele sobre o processo, solicitando que os advogados viessem em seu lugar, se entendessem necessário. Marcos, muito aborrecido, afirmou que faria uma representação contra o magistrado, por entender que suas prerrogativas profissionais foram violadas. A respeito da conduta de Marcos, assinale a opção correta.",
      alternativas: {
        A: "Marcos teve sua prerrogativa profissional violada, pois é direito do advogado e do estagiário inscrito na OAB dirigir-se diretamente ao magistrado nas salas e gabinetes de trabalho, independentemente de horário previamente marcado, observando-se a ordem de chegada.",
        B: "Marcos não teve sua prerrogativa profissional violada, pois apenas deve dirigir-se diretamente ao magistrado quando os advogados que atuam na causa estiverem impossibilitados de fazê-lo, sendo a atuação do estagiário subsidiária em relação à atuação do advogado.",
        C: "Marcos não teve sua prerrogativa profissional violada, pois apenas o advogado tem direito de dirigir-se diretamente ao magistrado nas salas e gabinetes de trabalho, independentemente de horário previamente marcado, observando-se a ordem de chegada. Ao contrário, Marcos praticou ato excedente à sua habilitação e, em razão disso, ficará impedido, posteriormente, de obter sua inscrição definitiva como advogado.",
        D: "Marcos não teve sua prerrogativa profissional violada, pois apenas o advogado tem direito de dirigir-se diretamente ao magistrado nas salas e gabinetes de trabalho, independentemente de horário previamente marcado, observando-se a ordem de chegada. Ao contrário, Marcos praticou ato excedente à sua habilitação e deve ser punido com pena de censura."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 110,
      enunciado: "Mara é advogada atuante, tendo especialização na área cível. Procurada por um cliente da área empresarial, ela aceita o mandato. Ocorre que seu cliente possui, em sua empresa, um departamento jurídico com numerosos advogados e um gerente. Por indicação deles, o cliente determina que Mara inclua, no mandato que lhe foi conferido, os advogados da empresa, para atuação conjunta. Com base no caso apresentado, observadas as regras do Estatuto da OAB e do Código de Ética e Disciplina da OAB, assinale a opção correta.",
      alternativas: {
        A: "A advogada deve aceitar a imposição do cliente por ser inerente ao mandato.",
        B: "A advogada deve aceitar a indicação de um advogado para atuar conjuntamente no processo.",
        C: "A advogada deve acolher o comando, por ser natural na vida forense a colaboração.",
        D: "A advogada não é obrigada a aceitar a imposição de seu cliente no caso."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 111,
      enunciado: "A advogada Ana integrou o departamento jurídico da empresa XYZ Ltda. e, portanto, participava de reuniões internas, com sócios e diretores, e externas, com clientes e fornecedores, tendo acesso a todos os documentos da sociedade, inclusive aos de natureza contábil, conhecendo assim, diversos fatos e informações relevantes sobre a empresa. Alguns anos após ter deixado os quadros da XYZ Ltda., Ana recebeu intimação para comparecer a determinada audiência e a prestar depoimento, como testemunha arrolada pela defesa, no âmbito de ação penal em que um dos sócios da empresa figurava como acusado do crime de sonegação fiscal. Ao comparecer à audiência, Ana afirmou que não prestaria depoimento sobre os fatos dos quais tomou conhecimento enquanto integrava o jurídico da XYZ Ltda. O magistrado que presidia o ato ressaltou que seu depoimento havia sido solicitado pelo próprio sócio da empresa, que a estaria, portanto, desobrigando do dever de guardar sigilo. Sobre a questão apresentada, observadas as regras do Estatuto da OAB e do Código de Ética e Disciplina da OAB, assinale a opção correta.",
      alternativas: {
        A: "Ana terá o dever de depor, pois o bem jurídico administração da justiça é mais relevante do que o bem jurídico inviolabilidade dos segredos.",
        B: "Ana terá o dever de depor, pois foi desobrigada por seu ex-cliente do dever de guardar sigilo sobre os fatos de que tomou conhecimento quando atuou como advogada da XYZ Ltda.",
        C: "Ana terá o dever de depor, pois não integra mais o departamento jurídico da empresa XYZ Ltda., tendo cessado, portanto, seu dever de guardar sigilo.",
        D: "Ana não terá o dever de depor, pois o advogado tem o direito de se recusar a depor, como testemunha, sobre fato relacionado à pessoa de quem foi ou seja advogado, mesmo quando solicitado pelo cliente."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 112,
      enunciado: "O advogado Armando alterou o endereço de seu escritório e, para comunicar tal alteração, enviou correspondência a grande número de pessoas, notadamente, seus clientes e outros advogados. Observadas as regras do Estatuto da OAB e do Código de Ética e Disciplina da OAB, Armando realizou publicidade irregular?",
      alternativas: {
        A: "Sim. Considera-se imoderado qualquer anúncio profissional mediante remessa de correspondência a uma coletividade.",
        B: "Sim. Ao advogado é vedado o envio de correspondência a clientes, salvo para tratar de temas que sejam de interesse desses últimos.",
        C: "Não. Armando poderia ter enviado a correspondência em questão, pois estava apenas comunicando a alteração de seu endereço.",
        D: "Não. A publicidade por meio de correspondência é permitida em qualquer caso e para comunicar qualquer tipo de informação."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 113,
      enunciado: "O filósofo inglês Jeremy Bentham, em seu livro Uma introdução aos princípios da moral e da legislação, defendeu o princípio da utilidade como fundamento para a Moral e para o Direito. Para esse autor, o princípio da utilidade é aquele que",
      alternativas: {
        A: "estabelece que a moral e a lei devem ser obedecidas porque são úteis à coexistência humana na vida em sociedade.",
        B: "aprova ou desaprova qualquer ação, segundo a tendência que tem a aumentar ou diminuir a felicidade das pessoas cujos interesses estão em jogo.",
        C: "demonstra que o direito natural é superior ao direito positivo, pois, ao longo do tempo, revelou-se mais útil à tarefa de regular a convivência humana.",
        D: "afirma que a liberdade humana é o bem maior a ser protegido tanto pela moral quanto pelo direito, pois são a liberdade de pensamento e a ação que permitem às pessoas tornarem algo útil."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 114,
      enunciado: "O jusfilósofo alemão Gustav Radbruch, após a II Guerra Mundial, escreve, como circular dirigida aos seus alunos de Heidelberg, seu texto “Cinco Minutos de Filosofia do Direito”, na qual afirma: “Esta concepção da lei e sua validade, a que chamamos Positivismo, foi a que deixou sem defesa o povo e os juristas contra as leis mais arbitrárias, mais cruéis e mais criminosas.” De acordo com a fórmula de Radbruch,",
      alternativas: {
        A: "embora as leis injustas sejam válidas e devam ser obedecidas, as leis extremamente injustas perderão a validade e o próprio caráter de jurídicas, sendo, portanto, dispensada sua obediência.",
        B: "apenas a lei justa pode ser considerada jurídica, pois a lei injusta não será direito.",
        C: "o direito é o mínimo ético de uma sociedade, de forma que qualquer lei injusta não será direito.",
        D: "o direito natural é uma concepção superior ao positivismo jurídico; por isso, a justiça deve sempre prevalecer sobre a segurança."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 115,
      enunciado: "A Sra. Maria da Silva é participante ativa da AMA-X (Associação de Moradores e Amigos do bairro X). Todos os dias, no fim da tarde, a Sra. Maria da Silva e um grupo de associados reuniam-se na praça da cidade, distribuindo material sobre os problemas do bairro. A associação convocava os moradores para esses encontros por meio da rádio da cidade e comunicava, previamente, o local e a hora das reuniões às autoridades competentes. Certa tarde, um grupo da Associação de Moradores do bairro Y ocupou o local que os participantes da AMA-X habitualmente utilizavam. O grupo do bairro Y não havia avisado, previamente, a autoridade competente sobre o evento, organizado em espaço público. A Sra. Maria da Silva, indignada com a utilização do mesmo espaço, e tendo sido frustrada a reunião de seu grupo, solicitou aos policiais militares, presentes no local, que tomassem as medidas necessárias para permitir a realização do encontro da AMA-X. Em relação à liberdade de associação e manifestação, assinale a afirmativa correta.",
      alternativas: {
        A: "A AMA-X deve buscar novo local de manifestação, tendo em vista que o local de reunião é público e que a associação do bairro Y possui os mesmos direitos de reunião e manifestação.",
        B: "A associação do bairro Y deve buscar novo local de manifestação, pois não tem o direito de frustrar reunião anteriormente convocada para o mesmo local, já que houve prévio aviso à autoridade competente sobre o uso do espaço público pela AMA-X.",
        C: "A AMA-X deve dividir o espaço com a associação do bairro Y, tendo em vista que o local de reunião é público e que o direito à livre manifestação de ideias é garantido.",
        D: "A associação do bairro Y poderá ser dissolvida por ato da autoridade pública municipal em razão de não ter comunicado previamente à Prefeitura a realização de suas reuniões em espaço público."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 116,
      enunciado: "O instituto da intervenção é de extrema excepcionalidade, razão pela qual restam minuciosamente delineadas as hipóteses na CRFB/88. Assinale a opção que contempla, à luz da CRFB/88, hipótese correta de intervenção.",
      alternativas: {
        A: "O Estado X, sob o pretexto de celeridade e efetividade, vem realizando somente contratações diretas, sem a aplicação da Lei Federal de Licitações e Contratos Administrativos – Lei n. 8.666/93. Nessa situação, poderá a União intervir no Estado X para prover a execução de lei federal.",
        B: "O Município Y, localizado no Estado Z, não vem destinando nos últimos seis meses o mínimo exigido da receita municipal na manutenção das escolas públicas municipais, sob o fundamento de que a iniciativa privada realiza melhor ensino. Nesta hipótese, tanto a União quanto o Estado Z, à luz da CRFB/88, poderão intervir no Município Y para garantir a aplicação do mínimo exigido da receita municipal na aludida manutenção.",
        C: "Nos casos de desobediência à ordem ou decisão judiciária, a decretação de intervenção independe de requisição judicial.",
        D: "O Município Z, em razão de problemas orçamentários, em 2013, decidiu, excepcionalmente, pela primeira vez na sua história, não realizar o pagamento da sua dívida fundada. À luz da CRFB/88, poderá o Estado W, onde está localizado o referido Município, intervir no ente menor para garantir o pagamento da dívida fundada."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 117,
      enunciado: "O estado de defesa e o estado de sítio são tidos como legalidades extraordinárias, verdadeiras excepcionalidades que possibilitam inclusive a suspensão de determinas garantias constitucionais. As hipóteses de incidência e o procedimento são exaustivamente tratados pela CRFB/88. Com base na previsão constitucional dos referidos institutos, assinale a opção correta.",
      alternativas: {
        A: "O estado de defesa e o estado de sítio podem ser decretados pelo Presidente da República, bastando a oitiva prévia do Conselho da República, do Conselho de Defesa Nacional e do Procurador-Geral da República.",
        B: "No estado de defesa, a oitiva do Congresso Nacional é posterior à sua decretação. Por sua vez, no estado de sítio, o Congresso Nacional deve ser ouvido previamente à decretação.",
        C: "Poderá o Presidente da República, à luz da CRFB/88, decretar estado de defesa em resposta a agressão armada de país vizinho.",
        D: "Em sendo hipótese de estado de sítio, o Congresso Nacional deverá ser fechado até o término das medidas coercitivas, para sua salvaguarda."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 118,
      enunciado: "Deise pretende ter acesso a informações pertinentes à atividade estatal que estão em poder de específico órgão público, aduzindo que todos os dados de interesse coletivo ou geral devem ser públicos. Nos termos da Constituição Federal, o direito de acesso às informações estatais",
      alternativas: {
        A: "é absoluto, em decorrência da publicidade dos atos.",
        B: "tem, como limite, o sigilo imprescindível à segurança do Estado.",
        C: "depende de autorização excepcional do Executivo.",
        D: "está limitado aos dados constantes nos sítios de informações estatais."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 119,
      enunciado: "Isabella promove ação popular em face do Município X, por entender que determinados gastos realizados estariam causando graves prejuízos ao patrimônio público. O pedido veio a ser julgado improcedente, por total carência de provas. Inconformada, Isabella apresenta a mesma ação com fundamento em novos elementos, e, mais uma vez, o pedido vem a ser julgado improcedente por carência de provas. Nos termos da Constituição Federal e da legislação de regência, assinale a opção correta.",
      alternativas: {
        A: "Sendo o pedido julgado improcedente, haverá condenação em honorários advocatícios.",
        B: "A improcedência por ausência de provas caracteriza a má-fé do autor popular.",
        C: "A reiteração na propositura da mesma ação acarreta o pagamento de custas pelo autor popular.",
        D: "As custas serão devidas se declarada, expressamente, a má-fé do autor popular."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 120,
      enunciado: "Maria da Silva, deputada federal integrante do partido Alfa, vem a ter projeto de sua iniciativa aprovado, com apoio de outros partidos políticos. Para sua surpresa, o texto do seu projeto veio a ser vetado na integralidade por decisão do Presidente da República. Após tomar ciência do veto presidencial, a deputada, com o intuito de derrubá-lo, procura as lideranças dos partidos que apoiaram seu projeto. Nos termos da Constituição Federal, assinale a opção que apresenta o procedimento correto.",
      alternativas: {
        A: "Vetado o projeto de lei, ocorrerá o seu arquivamento.",
        B: "Após o veto, a matéria somente poderá ser reapreciada no ano subsequente.",
        C: "O veto poderá ser rejeitado, o que acarretará o envio do projeto para promulgação pelo Presidente da República.",
        D: "A apreciação do veto deverá ocorrer, em separado, por cada Casa Legislativa, podendo ser rejeitado pela maioria absoluta de cada uma delas."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 121,
      enunciado: "No que tange às disposições legais regulamentadoras da ação direta de inconstitucionalidade, da ação direta de inconstitucionalidade por omissão e da ação declaratória de constitucionalidade, assinale a opção correta.",
      alternativas: {
        A: "A medida cautelar em ação direta de inconstitucionalidade por omissão poderá consistir na suspensão de procedimentos administrativos.",
        B: "O ajuizamento de ação direta de inconstitucionalidade e de ação direta de inconstitucionalidade por omissão não admite desistência. Em razão da presunção de constitucionalidade do ordenamento jurídico, a legislação específica da ação declaratória de constitucionalidade admite desistência.",
        C: "Existindo norma federal objeto, ao mesmo tempo, de ação declaratória de constitucionalidade e de ação direta de inconstitucionalidade, em homenagem ao caráter ambivalente destas ações, será uma delas extinta sem resolução do mérito por litispendência e a outra terá julgamento de mérito.",
        D: "Da decisão proferida na ação declaratória de constitucionalidade caberá, tão somente, a oposição de embargos de declaração e o ajuizamento posterior de ação rescisória."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 122,
      enunciado: "Em maio de 1996, o Brasil instituiu seu primeiro Programa Nacional de Direitos Humanos (PNDH 1). Na Introdução do PNDH 2, adotado em maio de 2002, vem escrito o seguinte: “Entre as principais medidas legislativas que resultaram de proposições do PNDH figuram... a transferência da justiça militar para a justiça comum dos crimes dolosos contra a vida praticados por policiais militares (Lei 9.299/96), que permitiu o indiciamento e o julgamento de policiais militares em casos de múltiplas e graves violações como os do Carandiru, Corumbiara e Eldorado dos Carajás; a tipificação do crime de tortura (Lei 9.455/97), que constituiu marco referencial para o combate a essa prática criminosa no Brasil; e a construção da proposta de reforma do Poder Judiciário, na qual se inclui, entre outras medidas destinadas a agilizar o processamento dos responsáveis por violações, a chamada ‘federalização’ dos crimes de direitos humanos.” Em relação ao último ponto descrito, é correto dizer que a federalização contra os crimes de direitos humanos pode ocorrer apenas no seguinte caso:",
      alternativas: {
        A: "havendo indício de violação de direitos humanos previstos na legislação nacional ou nos tratados internacionais.",
        B: "havendo grave violação de direitos humanos previstos nos tratados internacionais de direitos humanos dos quais o Brasil seja parte.",
        C: "havendo violação das leis protetivas dos direitos humanos, tais quais as leis citadas na Introdução do PNDH 2.",
        D: "havendo grave violação dos direitos humanos previstos na Constituição Federal."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 123,
      enunciado: "Em 2014, em pelo menos 24 Estados do Brasil, estavam cadastradas mais de 3.500 comunidades quilombolas. As comunidades quilombolas são grupos étnico-raciais, segundo critérios de autoatribuição, com trajetória histórica própria, dotados de relações territoriais específicas e com ancestralidade negra relacionada com a resistência à opressão histórica sofrida. O constituinte brasileiro reconheceu a identidade dos quilombolas e, especificamente, seu direito fundamental à",
      alternativas: {
        A: "expressão cultural e artística.",
        B: "educação em escolas próprias.",
        C: "prática religiosa e litúrgica conforme suas tradições.",
        D: "propriedade definitiva das terras que estejam ocupando."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 124,
      enunciado: "A história recente da república brasileira conta com capítulos autoritários e violentos. Para restituir o direito à memória e cessar a violência do silêncio e da desinformação, o Estado brasileiro aprovou a Lei n. 12.528/11 que instituiu, no âmbito da Casa Civil da Presidência da República, a Comissão Nacional da Verdade, como forma de realizar, no Brasil, a Justiça de Transição. Assinale a opção que apresenta o objetivo dessa Comissão.",
      alternativas: {
        A: "Investigar as atividades praticadas por grupos de oposição ao governo, no período de 1946 até 1988, para apurar as responsabilidades civis e criminais de seus militantes em eventuais atos ilegais.",
        B: "Promover uma avaliação e revisão da anistia no Brasil para, ao final, propor uma PEC que modifique e adeque o Art. 8º, dos Atos das Disposições Constitucionais Transitórias, que trata, justamente, da anistia.",
        C: "Examinar e esclarecer as graves violações de direitos humanos praticadas entre 1946 e 1988, a fim de efetivar o direito à memória e à verdade histórica, bem como promover a reconciliação nacional.",
        D: "Examinar e esclarecer ocorrência de crimes praticados entre 1946 e 1988 que não tenham sido resolvidos à época, a fim de efetivar o direito à memória e à verdade histórica, bem como promover a reconciliação nacional."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 125,
      enunciado: "Na hipótese de inadimplência do Estado brasileiro, condenado ao pagamento de quantia certa pela Corte Interamericana de Direitos Humanos, deverá o interessado",
      alternativas: {
        A: "executá-la perante a Justiça Federal pelo processo interno vigente para a execução de sentenças contra o Estado.",
        B: "pedir que os autos do processo sejam encaminhados ao Conselho de Segurança da ONU para a imposição de sanções internacionais.",
        C: "reivindicar pelo processo vigente no país, porque as sentenças proferidas pela Corte Interamericana de Direitos Humanos são desprovidas de executoriedade.",
        D: "postular perante a Corte a intimação do Estado brasileiro para efetuar o pagamento em vinte e quatro horas ou nomear bens à penhora."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 126,
      enunciado: "A respeito da condição jurídica do estrangeiro, disciplinada pela Lei n. 6.815/80, assinale a afirmativa correta.",
      alternativas: {
        A: "Nos casos de entrada ou estada irregular de estrangeiro, se este não se retirar voluntariamente do território nacional no prazo fixado em Regulamento, será promovida a sua expulsão.",
        B: "Quando mais de um Estado requerer a extradição da mesma pessoa pelo mesmo fato, terá preferência o pedido daquele em cujo território a infração foi cometida.",
        C: "A República Federativa do Brasil não extradita os seus nacionais, salvo em caso de reciprocidade.",
        D: "Conceder-se-á extradição mesmo quando o fato constituir crime político e o extraditando houver de responder, no Estado requerente, perante tribunal ou juízo de exceção."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 127,
      enunciado: "Visando a proteger a indústria de tecnologia da informação, o governo federal baixou medida, mediante decreto, em que majora de 15% para 20% a alíquota do Imposto sobre a Importação de Produtos Estrangeiros para monitores de vídeo procedentes do exterior, limites esses que foram previstos em lei. A respeito da modificação de alíquota do Imposto de Importação, assinale a afirmativa correta.",
      alternativas: {
        A: "Deve observar a reserva de lei complementar.",
        B: "Deve ser promovida por lei ordinária.",
        C: "Deve observar o princípio da irretroatividade.",
        D: "Deve observar o princípio da anterioridade."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 128,
      enunciado: "Empresa X, constituída em 1980, entrou com ação na Justiça Federal impugnando a cobrança da Contribuição Sobre o Lucro – CSLL, alegando que, apesar de prevista no Art. 195, I, c, da Constituição Federal, trata-se de um tributo que tem o lucro como fato gerador. Dessa forma, haveria um bis in idem em relação ao Imposto Sobre a Renda das Pessoas Jurídicas (Art. 153, III da CRFB), o que é vedado pelo próprio texto constitucional. A partir do caso narrado e considerando a jurisprudência dominante do Supremo Tribunal Federal, assinale a afirmativa correta.",
      alternativas: {
        A: "A empresa tem razão porque os dois tributos têm o lucro como fato gerador, o que é vedado pela Constituição Federal.",
        B: "A empresa, por ter sido constituída anteriormente à Constituição Federal de 1988, tem direito adquirido a não pagar a CSLL.",
        C: "A empresa não tem razão, porque ambos os tributos estão previstos na CRFB.",
        D: "A empresa tem razão, pela clara violação à vedação ao confisco prevista no Art. 150, IV, da CRFB."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 129,
      enunciado: "Lei municipal que dispõe sobre o Imposto sobre a Propriedade Predial e Territorial Urbana – IPTU − estabelece a solidariedade entre os proprietários de um mesmo imóvel. Os efeitos da solidariedade estão listados nas opções a seguir, à exceção de uma. Assinale-a.",
      alternativas: {
        A: "A interrupção da decadência, em favor ou contra um dos obrigados, favorece ou prejudica os demais.",
        B: "A interrupção da prescrição, em favor ou contra um dos obrigados, favorece ou prejudica aos demais.",
        C: "O pagamento efetuado por um dos obrigados aproveita os demais.",
        D: "A isenção ou remissão de crédito exonera todos os obrigados, salvo se outorgada pessoalmente a um deles, subsistindo, nesse caso, a solidariedade quanto aos demais pelo saldo."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 130,
      enunciado: "Presume-se fraudulenta a alienação ou oneração de bens ou rendas por sujeito passivo em débito para com a Fazenda Pública",
      alternativas: {
        A: "por crédito tributário ainda não inscrito em dívida ativa, desde que não tenham sido reservados pelo devedor bens ou rendas suficientes ao total pagamento da dívida.",
        B: "por crédito tributário regularmente inscrito em dívida ativa, desde que não tenham sido reservados pelo devedor bens ou rendas suficientes ao total pagamento da dívida inscrita.",
        C: "por crédito tributário regularmente inscrito em dívida ativa, mesmo que tenham sido reservados pelo devedor bens ou rendas suficientes ao total pagamento da dívida inscrita.",
        D: "por crédito tributário ainda não inscrito em dívida ativa, objeto de impugnação administrativa oferecida pelo contribuinte."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 131,
      enunciado: "Caso o Estado delegue a reforma, manutenção e operação de uma rodovia estadual à iniciativa privada, com a previsão de que a amortização dos investimentos e a remuneração do particular decorram apenas da tarifa cobrada dos usuários do serviço, estaremos diante de uma",
      alternativas: {
        A: "concessão de obra pública.",
        B: "concessão administrativa.",
        C: "concessão patrocinada.",
        D: "concessão de serviço público precedida da execução de obra pública."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 132,
      enunciado: "Numerosos professores, em recente reunião da categoria, queixaram-se da falta de interesse dos alunos pela cultura nacional. O Sindicato dos Professores de Colégios Particulares do Município X apresentou, então, um plano para ampliar o acesso à cultura dos alunos com idade entre 10 e 18 anos, obter a qualificação de “Organização da Sociedade Civil de Interesse Público” (OSCIP) e celebrar um termo de parceria com a União, a fim de unir esforços no sentido de promover a cultura nacional. Considerando a proposta apresentada e a disciplina existente sobre o tema, assinale a afirmativa correta.",
      alternativas: {
        A: "O sindicato não pode se qualificar como Organização da Sociedade Civil de Interesse Público, uma vez que tal qualificação, de origem doutrinária, não tem amparo legal.",
        B: "O sindicato não pode se qualificar como OSCIP, em virtude de vedação expressa da lei federal sobre o tema.",
        C: "O sindicato pode se qualificar como OSCIP, uma vez que é uma entidade sem fins lucrativos e o objetivo pretendido é a promoção da cultura nacional.",
        D: "O sindicato pode se qualificar como OSCIP, mas deve celebrar um contrato de gestão e não um termo de parceria com o poder público."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 133,
      enunciado: "Manolo, servidor público federal, obteve a concessão de aposentadoria por invalidez após ter sido atestado, por junta médica oficial, o surgimento de doença que o impossibilitava de desenvolver atividades laborativas. Passados dois anos, entretanto, Manolo voltou a ter boas condições de saúde, podendo voltar a trabalhar, o que foi comprovado por junta médica oficial. Nesse caso, o retorno do servidor às atividades laborativas na Administração, no mesmo cargo anteriormente ocupado, configura exemplo de",
      alternativas: {
        A: "reintegração.",
        B: "reversão.",
        C: "aproveitamento.",
        D: "readaptação."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 134,
      enunciado: "Cinco empresas que, somadas, dominam 90% (noventa por cento) da produção metalúrgica nacional acordam, secretamente, a redução da oferta de bens por elas produzidos, a fim de elevar o preço dos seus produtos. A partir da hipótese apresentada, assinale a opção correta.",
      alternativas: {
        A: "A garantia da livre concorrência no texto constitucional impede a intervenção do Estado nessa hipótese.",
        B: "A atuação das empresas configura infração da ordem econômica, sujeitando-as à intervenção do Estado.",
        C: "A situação de domínio do mercado resulta de processo natural fundado na maior eficiência em relação aos demais competidores, não caracterizando, portanto, qualquer infração.",
        D: "A intervenção do Estado na ordem econômica somente será permitida quando necessária aos imperativos da segurança nacional ou a relevante interesse coletivo."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 135,
      enunciado: "A Secretaria de Defesa do Meio Ambiente do Estado X lavrou auto de infração, cominando multa no valor de R$ 15.000,00 (quinze mil reais) à empresa Explora, em razão da instalação de uma saída de esgoto clandestina em uma lagoa naquele Estado. A empresa não impugnou o auto de infração lavrado e não pagou a multa aplicada. Considerando o exposto, assinale a afirmativa correta.",
      alternativas: {
        A: "A aplicação de penalidade representa exercício do poder disciplinar e autoriza a apreensão de bens para a quitação da dívida, em razão da executoriedade do ato.",
        B: "A aplicação de penalidade representa exercício do poder de polícia e autoriza a apreensão de bens para a quitação da dívida, em razão da executoriedade do ato.",
        C: "A aplicação de penalidade representa exercício do poder disciplinar, mas não autoriza a apreensão de bens para a quitação da dívida.",
        D: "A aplicação de penalidade representa exercício do poder de polícia, mas não autoriza a apreensão de bens para a quitação da dívida."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 136,
      enunciado: "Caio, chefe de gabinete do prefeito do município X, ocupante exclusivamente de cargo em comissão, conhecendo os planos concretos da prefeitura para levar asfaltamento, saneamento e outras intervenções urbanísticas a um bairro mais distante, revela a alguns construtores tal fato, levando-os a adquirir numerosos terrenos naquela localidade antes que ocorresse sua valorização imobiliária. Caio recusa, expressamente, todos os presentes enviados pelos construtores. Sobre a situação hipotética descrita acima, assinale a opção correta.",
      alternativas: {
        A: "O ato de improbidade pode estar configurado com a mera comunicação, antes da divulgação oficial, da medida a ser adotada pela prefeitura, que valorizará determinados imóveis, ainda que não tenha havido qualquer vantagem para Caio.",
        B: "A configuração da improbidade administrativa depende, sempre, da existência de enriquecimento ilícito por parte de Caio ou de lesão ao erário, requisitos ausentes no caso concreto.",
        C: "Caio, caso venha a ser condenado criminalmente pela prática das condutas acima descritas, não poderá responder por improbidade administrativa, sob pena de haver bis in idem.",
        D: "Caio não responde por ato de improbidade, por não ser servidor de carreira; responde, todavia, por crime de responsabilidade, na qualidade de agente político, ocupante de cargo em comissão."
      },
      gabarito: "A",
      anulada: false
    },
    {
      numero: 137,
      enunciado: "Kellen, empreendedora individual, obtém, junto ao órgão municipal, licença de instalação de uma fábrica de calçados. A respeito da hipótese formulada, assinale a afirmativa correta.",
      alternativas: {
        A: "A licença não é válida, uma vez que os municípios têm competência para a análise de estudos de impacto ambiental, mas não para a concessão de licença ambiental.",
        B: "Com a licença de instalação obtida, a fábrica de calçados poderá iniciar suas atividades de produção, gerando direito adquirido pelo prazo mencionado na licença expedida pelo município.",
        C: "A licença é válida, porém não há impedimento que um Estado e a União expeçam licenças relativas ao mesmo empreendimento, caso entendam que haja impacto de âmbito regional e nacional, respectivamente.",
        D: "Para o início da produção de calçados, é imprescindível a obtenção de licença de operação, sendo concedida após a verificação do cumprimento dos requisitos previstos nas licenças anteriores."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 138,
      enunciado: "A definição dos espaços territoriais especialmente protegidos é fundamental para a manutenção dos processos ecológicos. Sobre o instituto da Reserva Legal, de acordo com o Novo Código Florestal (Lei n. 12.651/2012), assinale a afirmativa correta.",
      alternativas: {
        A: "Pode ser instituído em área rural ou urbana, desde que necessário à reabilitação dos processos ecológicos.",
        B: "Incide apenas sobre imóveis rurais, e sua área deve ser mantida sem prejuízo da aplicação das normas sobre as Áreas de Preservação Permanente.",
        C: "Foi restringida, de acordo com a Lei n. 12.651/2012, às propriedades abrangidas por Unidades de Conservação.",
        D: "Incide apenas sobre imóveis públicos, consistindo em área protegida para a preservação da estabilidade geológica e da biodiversidade."
      },
      gabarito: "B",
      anulada: false
    },
    {
      numero: 139,
      enunciado: "Sara e Bernardo doaram o imóvel que lhes pertencia a Miguel, ficando o imóvel gravado com usufruto em favor dos doadores. Dessa forma, quanto aos deveres dos usufrutuários, assinale a afirmativa INCORRETA:",
      alternativas: {
        A: "Não devem pagar as deteriorações resultantes do exercício regular do usufruto.",
        B: "Devem arcar com as despesas ordinárias de conservação do bem no estado em que o receberam.",
        C: "Devem arcar com os tributos inerentes à posse da coisa usufruída.",
        D: "Não devem comunicar ao dono a ocorrência de lesão produzida contra a posse da coisa."
      },
      gabarito: "D",
      anulada: false
    },
    {
      numero: 140,
      enunciado: "João é locatário de um imóvel residencial de propriedade de Marcela, pagando mensalmente o aluguel por meio da entrega pessoal da quantia ajustada. O locatário tomou ciência do recente falecimento de Marcela ao ler “comunicação de falecimento” publicada pelos filhos maiores e capazes de Marcela, em jornal de grande circulação. Marcela, à época do falecimento, era viúva. Aproximando-se o dia de vencimento da obrigação contratual, João pretende quitar o valor ajustado. Todavia, não sabe a quem pagar e sequer tem conhecimento sobre a existência de inventário. De acordo com os dispositivos que regem as regras de pagamento, assinale a afirmativa correta.",
      alternativas: {
        A: "João estará desobrigado do pagamento do aluguel desde a data do falecimento de Marcela.",
        B: "João deverá proceder à imputação do pagamento, em sua integralidade, a qualquer dos filhos de Marcela, visto que são seus herdeiros.",
        C: "João estará autorizado a consignar em pagamento o valor do aluguel aos filhos de Marcela.",
        D: "João deverá utilizar-se da dação em pagamento para adimplir a obrigação junto aos filhos maiores de Marcela, estando estes obrigados a aceitar."
      },
      gabarito: "C",
      anulada: false
    },
    {
      numero: 141,
      enunciado: "Marcos e Paula, casados, pais de Isabel e Marcelo, menores impúberes, faleceram em um grave acidente automobilístico. Em decorrência deste fato, Pedro, avô materno nomeado tutor dos menores, restou incumbido, nos termos do testamento, do dever de administrar o patrimônio dos netos, avaliado em dois milhões de reais. De acordo com o testamento, o tutor foi dispensado de prestar contas de sua administração. Diante dos fatos narrados e considerando as regras de Direito Civil sobre prestação de contas no exercício da tutela, assinale a opção correta.",
      alternativas: {
        A: "Pedro está dispensado de prestar contas do exercício da tutela, tendo em vista o disposto no testamento deixado pelos pais de Isabel e Marcelo, por ser um direito disponível.",
        B: "Caso Pedro falecesse no exercício da tutela, haveria dispensa de seus herdeiros prestarem contas da administração dos bens de Isabel e Marcelo.",
        C: "A responsabilidade de Pedro de prestar contas da administração da tutela cessará quando Isabel e Marcelo atingirem a maioridade e derem a devida quitação.",
        D: "Pedro tem a obrigação de prestar contas da administração da tutela de dois em dois anos e também quando deixar o exercício da tutela, ou sempre que for determinado judicialmente."
      },
      gabarito: "D",
      anulada: false
    }
  ]
};

// ──────────────────────────────────────────────
// TIPOS
// ──────────────────────────────────────────────
type Questao = typeof provaData.questoes[0];
type Respostas = Record<number, string>;

// ──────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ──────────────────────────────────────────────
const SectionTag = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <span className={`font-mono text-[11px] tracking-[0.2em] px-4 py-1.5 rounded-full border ${dark ? 'border-white/20 text-white/70' : 'border-primary/30 text-primary'
    } uppercase mb-4 inline-block w-fit`}>
    {text}
  </span>
);

// ──────────────────────────────────────────────
// TIMER HOOK
// ──────────────────────────────────────────────
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => { setSeconds(0); setRunning(false); }, []);

  const formatted = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return { seconds, formatted, running, start, stop, reset };
}

// ──────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ──────────────────────────────────────────────
export default function SimuladoPage() {
  const questoes = provaData.questoes;
  const totalQuestoes = questoes.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [submitted, setSubmitted] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const timer = useTimer();
  const questionRef = useRef<HTMLDivElement>(null);

  // Iniciar timer ao montar
  useEffect(() => { timer.start(); }, []);

  const currentQuestion = questoes[currentIndex];
  const respondidas = Object.keys(respostas).length;
  const progress = (respondidas / totalQuestoes) * 100;

  const handleAnswer = (questaoNum: number, alternativa: string) => {
    if (submitted) return;
    setRespostas(prev => ({ ...prev, [questaoNum]: alternativa }));
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowNav(false);
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = () => {
    timer.stop();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setRespostas({});
    setSubmitted(false);
    setCurrentIndex(0);
    timer.reset();
    timer.start();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cálculo de resultado
  const calcResult = () => {
    let corretas = 0;
    let erradas = 0;
    let anuladas = 0;
    questoes.forEach(q => {
      if (q.anulada) { anuladas++; return; }
      const resp = respostas[q.numero];
      if (resp === q.gabarito) corretas++;
      else if (resp) erradas++;
    });
    const naoRespondidas = totalQuestoes - respondidas - anuladas;
    return { corretas, erradas, anuladas, naoRespondidas };
  };

  const getAlternativaStyle = (questao: Questao, alt: string) => {
    const selecionada = respostas[questao.numero] === alt;

    if (!submitted) {
      if (selecionada) return 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/30';
      return 'border-black/8 bg-white/50 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm';
    }

    // Modo resultado
    if (questao.anulada) {
      if (selecionada) return 'border-yellow-500/50 bg-yellow-50';
      return 'border-black/5 bg-white/30 opacity-60';
    }

    const isCorrect = alt === questao.gabarito;
    if (isCorrect) return 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/30';
    if (selecionada && !isCorrect) return 'border-red-500 bg-red-50 ring-2 ring-red-400/30';
    return 'border-black/5 bg-white/30 opacity-50';
  };

  return (
    <div className="bg-bg text-text min-h-screen font-jakarta selection:bg-primary selection:text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-[100] bg-white/20 backdrop-blur-sm border-b border-white/40 px-6 lg:px-10 py-4">
        <div className="max-w-[1180px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="font-inter font-black text-lg md:text-2xl tracking-tighter uppercase">Kit OAB</span>
            </Link>
            <span className="hidden md:inline-block font-mono text-[10px] text-text-sec uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full border border-black/5">Simulado</span>
            <Link to="/apostila" className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
              Apostila PDF
            </Link>
          </div>

          {/* Timer + Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-sm bg-white/60 px-4 py-2 rounded-xl border border-black/5">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold tracking-wider">{timer.formatted}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-text-sec uppercase tracking-wider">
              <span className="hidden sm:inline">{respondidas}/{totalQuestoes}</span>
              <div className="w-20 h-2 bg-black/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BARRA INFO DA PROVA */}
      <div className="bg-primary-deep py-3 px-6">
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8 font-mono text-[10px] text-white/70 uppercase tracking-widest">
          <span>{provaData.prova.nome}</span>
          <span className="text-white/30">•</span>
          <span>Tipo {provaData.prova.tipo} · Cor {provaData.prova.cor}</span>
          <span className="text-white/30">•</span>
          <span>{new Date(provaData.prova.data).toLocaleDateString('pt-BR')}</span>
          <span className="text-white/30">•</span>
          <span>{totalQuestoes} questões neste simulado</span>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-8 md:py-12">

        {/* RESULTADO */}
        {submitted && (() => {
          const r = calcResult();
          const notaPercent = Math.round((r.corretas / (totalQuestoes - r.anuladas)) * 100);
          const aprovado = notaPercent >= 50;

          return (
            <div className="mb-12 animate-in">
              <div className={`bg-bg shadow-neumorphic rounded-[32px] border border-white/60 p-8 md:p-12 relative overflow-hidden`}>
                {/* Decorative bg */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 ${aprovado ? 'bg-emerald-500/5' : 'bg-red-500/5'}`} />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8">
                    {/* Score Circle */}
                    <div className="shrink-0">
                      <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full border-8 flex flex-col items-center justify-center ${aprovado ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
                        }`}>
                        <span className={`text-5xl md:text-6xl font-inter font-black leading-none ${aprovado ? 'text-emerald-600' : 'text-red-600'}`}>
                          {notaPercent}%
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest mt-1 text-text-sec">acertos</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                        {aprovado
                          ? <Trophy className="w-7 h-7 text-emerald-500" />
                          : <Target className="w-7 h-7 text-red-500" />
                        }
                        <h2 className={`text-3xl md:text-4xl font-inter font-black tracking-tight ${aprovado ? 'text-emerald-600' : 'text-red-600'}`}>
                          {aprovado ? 'Parabéns!' : 'Continue treinando!'}
                        </h2>
                      </div>
                      <p className="text-text-sec text-base mb-6">
                        {aprovado
                          ? 'Você atingiu a pontuação necessária para aprovação neste simulado. Continue praticando!'
                          : 'Você ficou abaixo da pontuação mínima. Revise as questões e tente novamente.'
                        }
                      </p>
                      <div className="flex items-center gap-2 font-mono text-sm text-text-sec mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Tempo total: <span className="font-bold text-text">{timer.formatted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Corretas", value: r.corretas, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
                      { label: "Erradas", value: r.erradas, color: "text-red-600", bg: "bg-red-50", icon: XCircle },
                      { label: "Em branco", value: totalQuestoes - respondidas, color: "text-text-sec", bg: "bg-white/60", icon: Hash },
                      { label: "Anuladas", value: r.anuladas, color: "text-yellow-600", bg: "bg-yellow-50", icon: AlertTriangle },
                    ].map((stat, i) => (
                      <div key={i} className={`${stat.bg} rounded-2xl p-4 border border-black/5 text-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                        <div className={`text-3xl font-inter font-black ${stat.color}`}>{stat.value}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-text-sec mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-vibrant text-white px-8 py-4 rounded-2xl font-inter font-black shadow-btn transition-all active:scale-95 cursor-pointer"
                    >
                      <RotateCcw className="w-5 h-5" />
                      REFAZER SIMULADO
                    </button>
                    <Link
                      to="/"
                      className="flex items-center justify-center gap-2 bg-bg shadow-neumorphic-sm border border-white/60 px-8 py-4 rounded-2xl font-inter font-bold hover:-translate-y-1 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      VOLTAR AO INÍCIO
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">

          {/* QUESTÃO PRINCIPAL */}
          <div ref={questionRef}>
            <div className="bg-bg shadow-neumorphic rounded-[32px] border border-white/60 p-6 md:p-10 relative overflow-hidden">
              {/* Top label */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <SectionTag text={`QUESTÃO ${currentQuestion.numero}`} />
                  {currentQuestion.anulada && (
                    <span className="font-mono text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-300 uppercase tracking-wider font-bold">
                      Anulada
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-text-sec uppercase tracking-widest">
                  {currentIndex + 1} de {totalQuestoes}
                </span>
              </div>

              {/* Enunciado */}
              <div className="mb-8">
                <p className="text-base md:text-lg leading-relaxed text-text">
                  {currentQuestion.enunciado}
                </p>
              </div>

              {/* Alternativas */}
              <div className="space-y-3">
                {Object.entries(currentQuestion.alternativas).map(([letra, texto]) => {
                  const selecionada = respostas[currentQuestion.numero] === letra;
                  const style = getAlternativaStyle(currentQuestion, letra);

                  return (
                    <button
                      key={letra}
                      onClick={() => handleAnswer(currentQuestion.numero, letra)}
                      disabled={submitted}
                      className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 group flex items-start gap-4 ${style} ${!submitted ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
                    >
                      <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-inter font-black text-sm transition-all ${selecionada && !submitted
                        ? 'bg-primary text-white shadow-lg'
                        : submitted && letra === currentQuestion.gabarito && !currentQuestion.anulada
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : submitted && selecionada && letra !== currentQuestion.gabarito && !currentQuestion.anulada
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white/80 text-text-sec border border-black/10 group-hover:border-primary/30'
                        }`}>
                        {submitted && !currentQuestion.anulada && letra === currentQuestion.gabarito
                          ? <CheckCircle className="w-5 h-5" />
                          : submitted && selecionada && letra !== currentQuestion.gabarito && !currentQuestion.anulada
                            ? <XCircle className="w-5 h-5" />
                            : letra}
                      </span>
                      <span className="text-sm md:text-base leading-relaxed pt-1">{texto}</span>
                    </button>
                  );
                })}
              </div>

              {/* Gabarito info after submit */}
              {submitted && !currentQuestion.anulada && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-emerald-700 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    Gabarito: Alternativa {currentQuestion.gabarito}
                  </div>
                </div>
              )}
              {submitted && currentQuestion.anulada && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-yellow-700 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    Questão anulada pelo gabarito oficial
                  </div>
                </div>
              )}
            </div>

            {/* NAVEGAÇÃO */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <button
                onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 bg-bg shadow-neumorphic-sm border border-white/60 px-5 py-3 rounded-2xl font-inter font-bold text-sm disabled:opacity-30 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="w-5 h-5" /> Anterior
              </button>

              {!submitted && currentIndex === totalQuestoes - 1 && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-vibrant text-white px-8 py-3 rounded-2xl font-inter font-black text-sm shadow-btn transition-all active:scale-95 cursor-pointer"
                >
                  <ListChecks className="w-5 h-5" /> FINALIZAR SIMULADO
                </button>
              )}

              {!submitted && respondidas === totalQuestoes && currentIndex !== totalQuestoes - 1 && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-vibrant text-white px-6 py-3 rounded-2xl font-inter font-black text-sm shadow-btn transition-all active:scale-95 cursor-pointer"
                >
                  <ListChecks className="w-5 h-5" /> FINALIZAR
                </button>
              )}

              <button
                onClick={() => goToQuestion(Math.min(totalQuestoes - 1, currentIndex + 1))}
                disabled={currentIndex === totalQuestoes - 1}
                className="flex items-center gap-2 bg-bg shadow-neumorphic-sm border border-white/60 px-5 py-3 rounded-2xl font-inter font-bold text-sm disabled:opacity-30 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer disabled:cursor-default"
              >
                Próxima <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SIDEBAR / NAVIGATION GRID */}
          <div className="lg:block">
            {/* Mobile toggle */}
            <button
              onClick={() => setShowNav(!showNav)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-bg shadow-neumorphic-sm border border-white/60 px-5 py-3 rounded-2xl font-inter font-bold text-sm mb-4 cursor-pointer"
            >
              <Hash className="w-4 h-4 text-primary" />
              {showNav ? 'Fechar navegação' : 'Ver todas as questões'}
            </button>

            <div className={`lg:sticky lg:top-24 ${showNav ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-bg shadow-neumorphic rounded-[24px] border border-white/60 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-4 h-4 text-primary" />
                  <span className="font-inter font-bold text-sm">Questões</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {questoes.map((q, i) => {
                    const respondida = respostas[q.numero] !== undefined;
                    const isActive = i === currentIndex;
                    let dotColor = '';

                    if (submitted) {
                      if (q.anulada) dotColor = 'bg-yellow-400';
                      else if (respostas[q.numero] === q.gabarito) dotColor = 'bg-emerald-500';
                      else if (respostas[q.numero]) dotColor = 'bg-red-500';
                      else dotColor = 'bg-black/10';
                    }

                    return (
                      <button
                        key={q.numero}
                        onClick={() => goToQuestion(i)}
                        className={`relative w-full aspect-square rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer active:scale-90
                          ${isActive
                            ? 'bg-primary text-white shadow-lg scale-110'
                            : respondida
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-white/60 text-text-sec border border-black/5 hover:border-primary/30'
                          }`}
                      >
                        {q.numero}
                        {submitted && (
                          <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${dotColor} border-2 border-bg`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-5 pt-4 border-t border-black/5 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[9px] text-text-sec uppercase tracking-wider">
                    <div className="w-3 h-3 rounded bg-primary/10 border border-primary/20" /> Respondida
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-text-sec uppercase tracking-wider">
                    <div className="w-3 h-3 rounded bg-white/60 border border-black/5" /> Em branco
                  </div>
                  {submitted && (
                    <>
                      <div className="flex items-center gap-2 font-mono text-[9px] text-text-sec uppercase tracking-wider">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" /> Correta
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[9px] text-text-sec uppercase tracking-wider">
                        <div className="w-3 h-3 rounded-full bg-red-500" /> Errada
                      </div>
                    </>
                  )}
                </div>

                {/* Submit button in sidebar */}
                {!submitted && (
                  <button
                    onClick={handleSubmit}
                    className="w-full mt-5 flex items-center justify-center gap-2 bg-primary hover:bg-primary-vibrant text-white px-4 py-3 rounded-xl font-inter font-black text-xs shadow-btn transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
                  >
                    <ListChecks className="w-4 h-4" /> Finalizar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="py-8 px-6 border-t border-black/5 bg-bg mt-12">
        <div className="max-w-[1180px] mx-auto flex flex-col items-center">
          <div className="font-inter font-black text-xl tracking-tighter mb-2 uppercase">Kit OAB</div>
          <p className="text-text-sec text-xs mb-4">Simulado — {provaData.prova.nome}</p>
          <div className="text-[9px] font-mono text-text-sec/60 uppercase tracking-widest text-center">
            © 2024 KIT OAB · MATERIAL INDEPENDENTE. NÃO POSSUI VÍNCULO OFICIAL COM A ORDEM DOS ADVOGADOS DO BRASIL.
          </div>
        </div>
      </footer>

      {/* Mobile timer floating */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50 bg-primary-deep text-white font-mono text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
        <Clock className="w-3.5 h-3.5" />
        {timer.formatted}
      </div>
    </div>
  );
}
