const functions = require('firebase-functions');
const unirest = require('unirest');
const Vergara = require('./Vergara');
const Twit = require('twit');
const T = new Twit(Vergara);
const results = 10;
var numerosRand = [];
const facts = [
    "MP diz que Flávio Bolsonaro e mulher receberam R$ 295,5 mil em depósitos sem origem conhecida para pagar apartamento na Barra",
    "O senador Flávio Bolsonaro (PSL-RJ) lucrou até 292% em transações imobiliárias suspeitas de lavagem de dinheiro",
    "Após Bolsonaro falar em “pólvora” em discurso polêmico, embaixador dos EUA exalta militares americanas",
    "Ao inferir que a vacina chinesa, agora sino-brasileira, causa morte, invalidez e anomalias, não só mentiu como cometeu uma penca de crimes",
    "A fixação do bozo pela comparação sexual – pejorativo e homofóbico – com tudo o que pensa e fala é notável. A psicologia explica: projeção, homossexualidade latente, desejo reprimido…",
    "Para aliados, Bolsonaro 'passou recibo' de irritação com notícias de que há busca por um candidato como Joe Biden para eleições brasileiras de 2022",
    "Brasil tem de deixar de ser 'país de maricas' e enfrentar pandemia 'de peito aberto', diz Bolsonaro. Porém, o que Bolsonaro fez para enfrentar a pandemia além de recomendar Cloroquina e politizar o uso de vacinas?",
    "Com a eleição de Biden nos EUA, Bolsonaro começou a dar chiliques e demonstrou toda sua instabilidade emocional. Atacou Hulk, a centro-direita e utilizou a palavra 'maricas' algumas vezes em diferentes contextos",
    "Bolsonaro Rambo disse: -\"Quando acaba a saliva tem que ter pólvora\", praticamente chamando os EUA para a guerra",
    "Jair Bolsonaro defende armas no campo: “Tem que ter fuzil, pô”. Vale lembrar que Bolsonaro teve seu 38 roubado e foi parar na mão de criminosos",
    "Flavio Bolsonaro pediu reembolso de uma viagem a Fernando de Noronha. Imagina como são os gastos do cartão corporativo que possuem sigilo",
    "Flávio Bolsonaro foi denunciado sob acusação de liderar organização criminosa da 'rachadinha'",
    "Em depoimento, ex-assessora de Flávio Bolsonaro confessa ‘rachadinha’ e repasses para Queiroz",
    "Diárias e passagens para seguranças de Flávio Bolsonaro em Noronha custaram R$ 18 mil",
    "Flávio Bolsonaro diz que viagem a Noronha no feriado foi a “serviço”. Três “esticadinhas” de Flávio Bolsonaro custaram mais de R$ 43 mil ao Senado",
    "Em sua primeira visita oficial ao Maranhão, Bolsonaro fez piada homofóbica e preconceituosa:Agora eu virei boiola. Igual maranhense, é isso?",
    "Bolsonaro não quer a vacina contra a covid chinesa, mas utiliza um iPhone que é produzido na China!!!",
    "Para agradar o gado, Bolsonaro não quer a vacina chinesa, mas seu iPhone chinês continua bombando no twitter",
    "O gado já derrubou essa conta três vezes, mas a gente não desiste!",
    "Bolsonaro defende a família, mas já se divorciou duas vezes",
    "Bolsonaro que nunca se manifestou a favor do uso de máscara ou pediu a população para usar alcool gel, fala agora que a vacina não será obrigatória",
    "A atual esposa do Bolsonaro, Micheque, recebeu 86 mil do assessor da família bozo",
    "Bolsonaro defende a Cloroquina, mesmo sem evidências científicas que comprovem a eficácia contra o COVID19",
    "Bolsonaro formou um governo de politicos envolvidos com corrupção, mesmo se dizendo contra a corrupção",
    "Flavio, filho de Bolsonaro, tem problemas com a justiça e não explica como enriqueceu apenas vendendo chocolate",
    "Jair Bolsonaro manteve funcionários fantasmas em seu gabinete enquanto era deputado federal",
    "Bárbara de Oliveira Ferraz, Denise Marques Felix, Patrícia Cristina Faustino de Paula, Dulcineia Pimenta Peixoto e Mirian Melo Lessa Glycério de Castro eram fantasmas de Bolsonaro",
    "A comitiva presidencial de Jair Bolsonaro levou cocaína pra Europa",
    "Suspeitas sobre Flávio Bolsonaro crescem com explicações inverossímeis no escândalo da rachadinha",
    "Bolsonaro desviou recursos de combate à covid para programa da esposa que por sua vez enviou para Damares. Essa usou o dinheiro com pastores...",
    "Jair Bolsonaro não responde por que salários de servidores públicos foram desviados e usados para pagar despesas pessoais de Michelle Bolsonaro e de sua família",
    "Jair Bolsonaro, ameaçou bater em repórter após pergunta sobre um 'suposto caso de corrupção'",
    "Bolsonaro disse: -Conselho meu e eu faço: eu sonego tudo o que for possível.",
    "Em uma entrevista para a revista Veja em 2 de dezembro de 1998, o Bolsonaro afirmou que a ditadura chilena de Augusto Pinochet, a qual matou mais de 3.000 pessoas e exilou outras 200.000,\"devia ter matado mais gente\"",
    "Bolsonaro se manifestou dizendo que \"daria uma porrada\", caso visse o seu filho fumando maconha",
    "Bolsonaro é considerado machista e sexista por vários setores da sociedade. Deve ter nascido de dois homens",
    "Bolsonaro falou que não ia estuprar a Maria do Rosário porque ela não merece. Será que ele já estuprou alguém que merecesse?",
    "Bolsonaro disse: - Eu tenho cinco filhos. Foram quatro homens, aí no quinto eu dei uma fraquejada e veio uma mulher",
    "Bolsonaro disse: - Seria incapaz de amar um filho homossexual. Não vou dar uma de hipócrita aqui: prefiro que um filho meu morra num acidente do que apareça com um bigodudo por aí",
    "Bolsonaro disse: - A maioria dos homossexuais é assassinada por seus respectivos cafetões, em áreas de prostituição e de consumo de drogas",
    "Mosqueteiros Filmes Ltda recebeu 20% do total ganho na campanha pelo candidato. Mas essa produtora só existe no papel",
    "Bolsonaro era contra o auxílio emergencial para amenizar os efeitos da covid. Só ficou a favor para praticar o populismo eleitoreiro",
    "Todo mundo proximo do ... é envolvido em corrupção, menos ele. Incrível como esse homem consegue ser puro no meio de tanto familiar ruim!",
    "Queiroz depositou mais de 20 cheques em conta de Michelle Bolsonaro",
    "Bolsonaro desviou R$ 7,5 MILHÕES destinados a testes de Covid para o programa da sua esposa Michelle",
    "Governo Bolsonaro começou com um escândalo a cada três dias: Onyx, ex-mulher, ministros que tinham supersalários, açaí, ministra JBS...",
    "Relatório do Coaf cita ex-servidora de Jair Bolsonaro, filha de ex-motorista de Flávio Bolsonaro",
    "Ex-assessora de Flávio Bolsonaro acumulava cargo na Alerj, emprego e estudo",
    "Ministro do Meio Ambiente é condenado por improbidade administrativa",
    "Filho de Mourão foi promovido no Banco do Brasil e triplicou seu salário",
    "Bolsonaro usou a popularidade de Sergio Moro. Moro, por sua vez, achou que ia ser indicado por Bolsonaro para o STF",
    "Flávio Bolsonaro conseguiu: promotora do caso rachadinhas será investigada",
    "Bolsonaro não sabe o que é estado laico ou se utiliza da fé para propagar seu populismo",
    "A primeira dama (Micheque) recebeu do Queiroz um cheque de R$24 mil. Bolsonaro que calado estava, calado ficou",
    "A tática de defesa de Flavio \"Copenhagen\" Bolsonaro em relação as rachadinhas é paralisar a investigação",
    "Ex-esposa de Bolsonaro, Rogéria Bolsonaro, mãe dos três filhos mais velhos, Eduardo, Flávio e Carlos, ainda quando era casada com Jair Bolsonaro e vereadora, comprou um imóvel avaliado em R$600 mil em dinheiro vivo",
    "Centrão - um grupo fisiológico que age conforme o vento governista e criticado por Bolsonaro na campanha presidencial - já administra 73 bilhões de reais no Governo Bolsonaro",
    "Ex-funcionária-fantasma de Bolsonaro, Wal do Açaí registra candidatura com sobrenome do presidente. Ex-assessora é investigada há dois anos pelo Ministério Público Federal de Brasília",
    "Bolsonaro diz que usou auxílio-moradia para \"comer gente\"",
    "Bolsonaro faturou R$ 4,2 milhões em salários extras e auxílio-moradia",
    "Antes da posse como presidente, Bolsonaro recebeu R$ 33,7 mil de auxílio-mudança como deputado mesmo sem quase comparecer à Câmara",
    "Fabrício Queiroz foi assessor de Flávio Bolsonaro por mais de dez anos",
    "Jair Bolsonaro pediu ao TSE exclusão de reportagens sobre \"Wal do açaí\"",
    "Bolsonaro sempre foi contra o isolamento social durante a pandemia. Acha que a cloroquina resolve a pandemia",
    "\"Bolsonaro é um macaco numa casa de louça\", disse Ciro Gomes",
    "Bolsonaro diz que 'acabou' com operação Lava Jato porque governo \'não tem mais corrupção\'. Já avisaram ao Queiroz? E ao vice-líder do governo no Senado?",
    "O gado usa a justificativa que o PT roubou mais por não ter capacidade cognitiva de entender que roubo é roubo, não importa o valor",
    "Bolsonaro não governa, quer apenas amansar o STF e conseguir a reeleição...",
    "Bolsonaro levou à ONU a postura de um jovem da quinta série que aponta o dedo para o colega quando está prestes a ser repreendido",
    "Bolsonaro fugiu de debates eleitorais e provavelmente irá fugir novamente nas próximas eleições",
    "Bolsonaro fez doação irregular de R$ 10 mil (em dinheiro vivo) para campanha eleitoral do filho Carlos",
    "O descaso do Bolsonaro com a pandemia de COVID-19 causou mortes desnecessariamente",
    "Para Bolsonaro, CPMF era uma \"desgraça\", mas agora pode \"substituir imposto\"",
    "Bolsonaro encerrou entrevista às pressas após ouvir pergunta sobre nova CPMF... ",
    "Jair Bolsonaro queria protestar contra o baixo salário que os militares recebiam na época (1987). Informou à repórter Cássia Maria que iria explodir bombas de baixa potência em banheiros da Vila Militar",
    "Entre 2010 a 2014, o patrimônio do Bolsonaro Pai cresceu mais de 150%, segundo a declaração registrada no TSE. Neste período, o parlamentar adquiriu cinco imóveis que juntos valem 8 milhões de reais",
    "Ao ser questionado por Preta Gil sobre o que faria se seu filho caso apaixonasse por uma garota negra, Bolsonaro disse que \"não corre esse risco porque seus filhos foram muito bem educados\"",
    "‘Sou homofóbico, sim, com muito orgulho’, diz Bolsonaro em vídeo. Na gravação, o candidato faz uso da imunidade parlamentar para assumir que tem preconceito com LGBTs",
    'Bolsonaro disse: - \"Não vou combater nem discriminar, mas, se eu vir dois homens se beijando na rua, vou bater\"',
    "Bolsonaro disse: - \"Sou preconceituoso, com muito orgulho\"",
    "Bolsonaro sobre seu posicionamento contra os homossexuais. \"90% dos adotados vão ser homossexuais e vão ser garotos de programa deste casal\" (referindo-se aos filhos adotados de casais homossexuais)",
    "Bolsonaro disse: - \"Se um casal homossexual vier morar do meu lado, isso vai desvalorizar a minha casa! Se eles andarem de mão dada e derem beijinho, desvaloriza\"",
    "Bolsonaro disse: - \"O próximo passo será a adoção de crianças por casais homossexuais e a legalização da pedofilia\" associando pedofilia ao movimento LGBT",
    "Bolsonaro disse: - \"Se eu for contratar um motorista para levar o meu filho em uma escola e descobrir que ele é gay… eu vou contratar?\"",
    " \"Tem a questão do coronavírus também que, no meu entender, está superdimensionado, o poder destruidor desse vírus\", disse Bolsonaro em evento em Miami no dia 9 de março.",
    "Bolsonaro sobre o recorde diário de mortes por covid19: - \"E daí? Lamento. Quer que eu faça o quê? Eu sou Messias, mas não faço milagre\", disse, em referência ao seu nome, Jair Messias Bolsonaro",
    "Lembrando que o senador do dinheiro fio dental não é só vice-líder do (des)governo, mas também chefe de Léo Índio, ex-sobrinho de Jair",
    "\"Quase uma união estável\", disse Bolsonaro ao senador Chico Rodrigues (DEM-RR), vice-líder do (des)governo no Senado. Durante operação, a PF apreendeu dinheiro entre as nádegas do vice-líder do (des)governo",
    "PF apreende dinheiro na cueca de vice-líder do (des)governo Bolsonaro em operação sobre desvios em verba da Covid-19",
    "A Polícia Federal encontrou dinheiro entre as nádegas do vice-líder do (des)governo no Senado, Chico Rodrigues (DEM-RR)",
    "Bolsonaro já teve seu 38 roubado na rua. Arma que provavelmente virou ferramenta de ladrões"]

exports.bozoBot = functions.pubsub
    .schedule('*/24 6-22 * * *')
    .timeZone('America/Sao_Paulo')
    .onRun((context) => {
    // = functions.https.onRequest((request, response) => {

        getStatuses();
        const req = unirest('GET', `https://api.twitter.com/2/tweets/search/recent?query=bolsonaro -is:retweet lang:pt&max_results=`+ results +`&tweet.fields=created_at&expansions=author_id&user.fields=username`)
            .headers({
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAI1aIgEAAAAAGEtraO3P5PkcUuuoWUjl4jz6oBg%3DM2fsmHjvAciXjzExutgwLogtCov95rhf8MaxBGfCixMmqyARSp'
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                const json = JSON.parse(res.raw_body)
                const limitRemaining = res.headers['x-rate-limit-remaining'];
                const limitReset = parseInt(res.headers['x-rate-limit-reset']);
                const agora = parseInt(Date.now() / 1000);
                functions.logger.log("Limit Remanining: ", limitRemaining);//"Limit Remaining"
                functions.logger.log("Contador: ", limitReset - agora);//"Contador"
                if (limitRemaining > 10) {
                    startSending(json);
                } else {
                    functions.logger.log("Perto do limite...");
                    setTimeout(startSending, (limitReset - agora) * 1000, json);
                }
            });
    });

function startSending(json){
    const totTt = parseInt(json.includes.users.length);
    for (let i=0; i<totTt; i++){
        const tt = randomicoNum(0,facts.length);
        let msg = `Vc sabia? ${facts[tt]} \n https://twitter.com/` + `${json.includes.users[i].username}` + `/status/` + `${json.data[i].id}`;
        console.log(msg);
        sendMsg(msg).then((result) => console.log('result ',result));
    }
}
async function sendMsg(msg){
    return await  T.post('statuses/update', {status: `${msg}`},
        (err, data, response) => {
            if (err) {
                functions.logger.error(err.allErrors);
                return err.allErrors;
            } else {
                return data;
            }
        })
}

async function getStatuses(){
    var req = await unirest( 'GET', 'https://api.twitter.com/1.1/users/show.json?screen_name=facts_bolsonaro')
        .headers({
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAI1aIgEAAAAAGEtraO3P5PkcUuuoWUjl4jz6oBg%3DM2fsmHjvAciXjzExutgwLogtCov95rhf8MaxBGfCixMmqyARSp'
        })
        .end(function (res) {
            if (res.error) throw new Error(res.error);
            const json = JSON.parse(res.raw_body)
            functions.logger.debug("Contador de post: ", json.statuses_count);
            const hora = new Date().getHours();
            functions.logger.debug("Hora: ", hora);
        });
}

function randomicoNum(min, max) {
    var lotouNumRand = false
    while (numerosRand.length < 90){
        lotouNumRand = true
        const num = Math.floor(Math.random() * (max - min + 1) ) + min;
        if (numerosRand.indexOf(num) === -1){
            numerosRand.push(num)
            return num
        }
    }
    if (!lotouNumRand){
        numerosRand = [];
    }
}