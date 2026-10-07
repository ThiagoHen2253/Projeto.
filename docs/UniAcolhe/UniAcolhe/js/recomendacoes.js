const DATA = {
  concentracao:{title:'Concentração',category:'Estudos',priority:'Alta',text:'Experimente dividir períodos longos de estudo em blocos menores, reduzir estímulos ao redor e preparar previamente o material que será usado.',actions:['Escolher um local com menos estímulos quando possível','Dividir o estudo em blocos curtos com pausas','Deixar celular e materiais não utilizados fora do campo de atenção']},
  organizacao:{title:'Organização de tarefas',category:'Estudos',priority:'Alta',text:'Use uma única lista ou calendário para reunir provas, trabalhos e prazos. Transforme trabalhos grandes em pequenas etapas.',actions:['Anotar todos os prazos em um calendário','Quebrar cada trabalho em etapas menores','Definir lembretes para os prazos principais']},
  tempo:{title:'Gerenciamento do tempo',category:'Rotina',priority:'Média',text:'Uma rotina visual pode ajudar a perceber quanto tempo cada atividade exige e evitar que muitas tarefas se acumulem.',actions:['Estimar o tempo de cada atividade','Reservar tempo para deslocamento e pausas','Começar tarefas importantes com antecedência']},
  leitura:{title:'Leitura e interpretação',category:'Estudos',priority:'Média',text:'Tente dividir textos longos em partes, destacar conceitos principais e escrever uma frase-resumo após cada trecho.',actions:['Separar textos por seções','Anotar palavras e ideias principais','Reescrever instruções longas com suas próprias palavras']},
  sons:{title:'Sensibilidade a sons',category:'Ambiente',priority:'Alta',text:'Quando possível, procure espaços mais tranquilos e observe quais horários costumam ter menos movimento.',actions:['Identificar locais de estudo mais silenciosos','Usar recursos permitidos que reduzam distrações','Planejar estudos em horários de menor movimento']},
  luzes:{title:'Sensibilidade a luzes',category:'Ambiente',priority:'Média',text:'Observe quais ambientes são mais confortáveis para você e, quando possível, escolha uma iluminação que reduza desconforto.',actions:['Testar diferentes espaços da instituição','Escolher uma posição confortável no ambiente','Verificar com a instituição possíveis recursos de acessibilidade']},
  movimento:{title:'Ambientes movimentados',category:'Ambiente',priority:'Média',text:'Mapeie os horários e espaços com maior fluxo de pessoas e, quando possível, escolha alternativas mais previsíveis.',actions:['Conhecer os espaços antes de utilizá-los','Escolher horários de menor movimento','Planejar rotas e locais alternativos']},
  mudancas:{title:'Mudanças de rotina',category:'Rotina',priority:'Média',text:'Uma agenda com mudanças previstas pode tornar alterações de horários e salas mais fáceis de acompanhar.',actions:['Conferir a agenda no início do dia','Ativar notificações de alterações quando disponíveis','Anotar mudanças importantes em um único lugar']},
  professores:{title:'Comunicação com professores',category:'Comunicação',priority:'Média',text:'Se falar pessoalmente for difícil, organize previamente o que precisa perguntar e use os canais institucionais disponíveis.',actions:['Anotar perguntas antes de procurar o professor','Utilizar canais oficiais de comunicação','Pedir instruções por escrito quando isso ajudar']},
  grupos:{title:'Trabalhos em grupo',category:'Convivência',priority:'Alta',text:'Definir funções, prazos e forma de comunicação logo no começo pode tornar a colaboração mais previsível.',actions:['Combinar responsabilidades por escrito','Definir um prazo interno antes da entrega','Comunicar dificuldades ao grupo com antecedência']},
  socializacao:{title:'Socialização',category:'Convivência',priority:'Média',text:'Não é necessário fazer tudo de uma vez. Pequenas interações repetidas podem ajudar a criar familiaridade com colegas e ambientes.',actions:['Começar por interações curtas','Participar de uma atividade ou grupo de interesse','Identificar uma pessoa de referência na turma']},
  apresentacao:{title:'Apresentações',category:'Avaliações',priority:'Média',text:'Preparar um roteiro objetivo e ensaiar em etapas pode diminuir a imprevisibilidade de uma apresentação.',actions:['Criar um roteiro com tópicos','Ensaiar em voz baixa ou com alguém de confiança','Separar o material necessário com antecedência']},
  provas:{title:'Provas e avaliações',category:'Avaliações',priority:'Alta',text:'Planejamento prévio e uma rotina de estudo distribuída podem ajudar a tornar as avaliações mais previsíveis.',actions:['Distribuir o conteúdo ao longo dos dias','Separar documentos e materiais antes da prova','Confirmar antecipadamente regras e local da avaliação']},
  pressao:{title:'Pressão acadêmica',category:'Bem-estar',priority:'Alta',text:'Organize prioridades, evite concentrar todas as entregas em um único período e procure os canais de apoio quando sentir que precisa de orientação.',actions:['Listar o que é urgente e o que pode esperar','Dividir grandes tarefas em pequenas ações','Procurar apoio institucional quando necessário']},
  rotina:{title:'Adaptação à rotina universitária',category:'Rotina',priority:'Média',text:'Uma rotina visual com horários de aula, deslocamento, alimentação, estudo e descanso pode facilitar a adaptação.',actions:['Montar uma agenda semanal','Conhecer antecipadamente salas e caminhos','Criar horários realistas de estudo e descanso']},
  pedirajuda:{title:'Encontrar ajuda',category:'Apoio',priority:'Alta',text:'Saber quem procurar é parte importante da adaptação. Comece pela coordenação ou pelos canais oficiais de atendimento ao aluno.',actions:['Salvar os contatos oficiais da instituição','Identificar a coordenação do seu curso','Conhecer os serviços de apoio disponíveis']}
};
const labels = Object.fromEntries(Object.entries(DATA).map(([k,v])=>[k,v.title]));
const selected = JSON.parse(localStorage.getItem('uniaColheSelections') || '[]');
const other = localStorage.getItem('uniaColheOther') || '';
document.getElementById('resultCount').textContent = selected.length + (other ? 1 : 0);
if(!selected.length && !other){
 document.getElementById('resultsArea').hidden=true; document.getElementById('emptyState').hidden=false;
}else{
 const list=document.getElementById('selectedList');
 selected.forEach(k=>{ const d=DATA[k]; if(!d)return; const x=document.createElement('span'); x.textContent=d.title; list.appendChild(x); });
 if(other){const x=document.createElement('span');x.textContent='Outra situação';list.appendChild(x);}
 const rec=document.getElementById('recommendations');
 selected.forEach(k=>{
   const d=DATA[k]; if(!d)return;
   const el=document.createElement('article'); el.className='recommendation';
   el.innerHTML=`<div class="rec-head"><div class="rec-icon">✦</div><div><span>${d.category}</span><h3>${d.title}</h3></div><b class="priority ${d.priority==='Alta'?'high':''}">${d.priority}</b></div><p>${d.text}</p><ul>${d.actions.map(a=>`<li>${a}</li>`).join('')}</ul>`;
   rec.appendChild(el);
 });
 if(other){
   const el=document.createElement('article'); el.className='recommendation';
   el.innerHTML=`<div class="rec-head"><div class="rec-icon">＋</div><div><span>RELATO DO ALUNO</span><h3>Outra situação</h3></div></div><p>Você relatou: <strong>${other.replace(/[<>&]/g,s=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[s]))}</strong></p><p>Para uma orientação específica, procure os canais oficiais da universidade e explique sua necessidade.</p>`;
   rec.appendChild(el);
 }
 const plans=[...new Set(selected.flatMap(k=>DATA[k]?.actions.slice(0,1)||[]))].slice(0,6);
 const plan=document.getElementById('planList');
 const saved=JSON.parse(localStorage.getItem('uniaColhePlan')||'{}');
 plans.forEach((p,i)=>{const row=document.createElement('label');row.className='plan-item';row.innerHTML=`<input type="checkbox" data-plan="${i}" ${saved[i]?'checked':''}><span class="plan-check">✓</span><b>${p}</b>`;plan.appendChild(row);});
 plan.querySelectorAll('input').forEach(c=>c.addEventListener('change',()=>{
   const s={}; plan.querySelectorAll('input').forEach(x=>s[x.dataset.plan]=x.checked);localStorage.setItem('uniaColhePlan',JSON.stringify(s));
 }));
}