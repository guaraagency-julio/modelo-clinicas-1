/* Lúmina — catálogo interativo e agendamento local de demonstração. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const image = (id, width = 900) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=82';
  const photos = {
    clinic: 'photo-1629909613654-28e377c37b09',
    care: 'photo-1606811971618-4486d14f3f99',
    tool: 'photo-1609840114035-3c981b782dfe',
    specialist: 'photo-1606811841689-23dfddce3e95',
    bright: 'photo-1598256989800-fe5f95da9787',
    smile: 'photo-1588776814546-1ffcf47267a5',
    office: 'photo-1609840114035-3c981b782dfe',
    doctor: 'photo-1559839734-2b71ea197ec2'
  };
  const treatments = [
    {id:'implante',name:'Implante dentário',category:'reabilitacao',image:photos.care,description:'Avaliação para substituir dentes ausentes e recuperar a função mastigatória, conforme planejamento individual.',detail:'Implantes podem ser considerados para substituir dentes perdidos. A indicação depende da avaliação clínica, das condições ósseas e de saúde e de exames complementares. O planejamento é feito caso a caso.'},
    {id:'alinhador',name:'Alinhador invisível',category:'ortodontia',image:photos.smile,description:'Uma possibilidade de tratamento ortodôntico com dispositivos removíveis e acompanhamento profissional.',detail:'Alinhadores transparentes podem ser utilizados em determinadas necessidades de movimentação dentária. Um exame clínico e a análise ortodôntica ajudam a avaliar a adequação, o tempo e os cuidados durante o tratamento.'},
    {id:'aparelho',name:'Aparelho dentário',category:'ortodontia',image:photos.specialist,description:'Acompanhamento para correção de posicionamento dentário e questões relacionadas à mordida.',detail:'A ortodontia busca avaliar e tratar questões de alinhamento dos dentes e da oclusão. Aparelhos fixos e outras opções podem ser considerados conforme objetivos e características clínicas de cada paciente.'},
    {id:'bichectomia',name:'Bichectomia',category:'estetica',image:photos.bright,description:'Informações e orientação sobre procedimentos de contorno facial realizados por profissional habilitado.',detail:'A avaliação para bichectomia exige análise anatômica detalhada, discussão de benefícios, limitações e riscos. A realização do procedimento depende da habilitação profissional e da indicação individual.'},
    {id:'bruxismo',name:'Bruxismo',category:'prevencao',image:photos.tool,description:'Investigação de sinais de apertamento ou ranger dos dentes e possibilidades de cuidado.',detail:'O bruxismo pode estar relacionado a desgaste dos dentes e desconfortos. A avaliação odontológica investiga sintomas e possíveis fatores associados para recomendar medidas de proteção e acompanhamento.'},
    {id:'clareamento',name:'Clareamento dental',category:'estetica',image:photos.smile,description:'Avaliação das opções de clareamento e orientações sobre sensibilidade e segurança.',detail:'O clareamento pode ser realizado por técnicas supervisionadas pelo cirurgião-dentista. Antes do procedimento, é importante avaliar a condição dos dentes e das gengivas, bem como a existência de restaurações e outros fatores.'},
    {id:'extracao',name:'Extração dentária',category:'prevencao',image:photos.care,description:'Planejamento de remoção dentária quando existe indicação clínica e após avaliação.',detail:'Uma extração pode ser necessária em situações específicas. O profissional avalia o dente, os exames e as condições de saúde do paciente para orientar a necessidade e os cuidados antes e depois do procedimento.'},
    {id:'lentes',name:'Lentes dentais',category:'estetica',image:photos.smile,description:'Planejamento estético individual, respeitando a saúde bucal e a estrutura dentária.',detail:'Procedimentos estéticos com laminados ou facetas exigem análise de mordida, higiene, saúde periodontal e expectativas. A indicação e o grau de intervenção variam entre pacientes.'},
    {id:'limpeza',name:'Limpeza profissional',category:'prevencao',image:photos.tool,description:'Cuidados preventivos e remoção profissional de placa e depósitos, quando indicado.',detail:'A profilaxia e outros procedimentos preventivos são definidos após avaliação da saúde oral. Consultas de rotina também permitem identificar necessidades de higiene e fatores de risco individuais.'},
    {id:'lipopapada',name:'Contorno de papada',category:'estetica',image:photos.bright,description:'Avaliação de opções de harmonização facial, considerando indicações e riscos.',detail:'Procedimentos para contorno da região submentoniana dependem de avaliação anatômica, técnica adequada e habilitação profissional. Nem todas as pessoas são candidatas e os resultados e riscos variam.'},
    {id:'infantil',name:'Odontopediatria',category:'prevencao',image:photos.clinic,description:'Acompanhamento da saúde oral de crianças com orientação para seus responsáveis.',detail:'A odontopediatria acompanha o desenvolvimento bucal infantil, orienta hábitos, higiene e alimentação e identifica alterações que merecem atenção. A frequência das consultas depende da avaliação profissional.'},
    {id:'periodontia',name:'Periodontia',category:'prevencao',image:photos.specialist,description:'Avaliação das gengivas e dos tecidos que dão sustentação aos dentes.',detail:'A periodontia estuda, previne e trata doenças que afetam gengivas e estruturas de suporte dos dentes. O plano de cuidado pode incluir orientações, acompanhamento e procedimentos adequados ao diagnóstico.'},
    {id:'overdenture',name:'Prótese overdenture',category:'reabilitacao',image:photos.clinic,description:'Uma das opções de reabilitação protética que pode utilizar implantes como suporte.',detail:'A overdenture é uma modalidade de prótese removível apoiada em implantes em casos selecionados. A escolha depende de fatores clínicos, funcionais e das preferências do paciente.'},
    {id:'labios',name:'Preenchimento labial',category:'estetica',image:photos.bright,description:'Avaliação estética facial com atenção às proporções, expectativas e segurança.',detail:'Antes de qualquer preenchimento, é necessário discutir indicações, riscos, produtos utilizados, contraindicações e habilitação profissional. Este modelo não oferece o procedimento.'},
    {id:'proteses',name:'Próteses dentárias',category:'reabilitacao',image:photos.care,description:'Soluções para substituição de dentes e reabilitação da mastigação e da fala.',detail:'Próteses fixas e removíveis são planejadas segundo a saúde oral, os dentes remanescentes e as necessidades funcionais. As possibilidades devem ser explicadas em consulta.'},
    {id:'protocolo',name:'Prótese protocolo',category:'reabilitacao',image:photos.smile,description:'Informações sobre reabilitações fixas apoiadas em implantes para casos indicados.',detail:'A prótese protocolo pode compor o tratamento de pacientes com perda de múltiplos dentes. O planejamento envolve avaliação clínica, exames e explicações sobre manutenção e cuidados.'},
    {id:'restauracoes',name:'Restaurações',category:'prevencao',image:photos.tool,description:'Procedimentos para recuperação de estruturas dentárias comprometidas, conforme avaliação.',detail:'Restaurações podem ser utilizadas em situações de cárie, fratura ou desgaste. A escolha de material e técnica depende do exame e da extensão da alteração.'},
    {id:'toxina',name:'Toxina botulínica',category:'estetica',image:photos.specialist,description:'Avaliação de indicações clínicas ou estéticas por profissional devidamente habilitado.',detail:'O uso da toxina botulínica envolve indicações específicas, contraindicações e riscos. É essencial avaliar a necessidade e confirmar a habilitação do profissional responsável.'},
    {id:'canal',name:'Tratamento de canal',category:'prevencao',image:photos.care,description:'Investigação e tratamento endodôntico quando há comprometimento de tecidos internos do dente.',detail:'O tratamento endodôntico pode ser indicado em situações que afetam a polpa dentária. O diagnóstico depende da avaliação odontológica e, quando necessário, de exames de imagem.'}
  ];
  const labels = {todos:'Todos',reabilitacao:'Reabilitação',ortodontia:'Ortodontia',estetica:'Estética',prevencao:'Prevenção'};
  const grid = $('#treatments-grid'), more = $('#more-treatments'), count = $('#treatment-count');
  let filter = 'todos', expanded = false;

  function cardMarkup(item) {
    return '<article class="treatment-card">' +
      '<div class="treatment-image"><img src="' + image(item.image) + '" alt="Imagem ilustrativa relacionada ao atendimento odontológico" loading="lazy" decoding="async"></div>' +
      '<div class="treatment-content"><h3>' + item.name + '</h3><p>' + item.description + '</p><div class="treatment-card-actions">' +
      '<button type="button" class="link-detail" data-treatment="' + item.id + '">SAIBA MAIS ↗</button>' +
      '<a href="#agendamento" class="link-book" data-book-treatment="' + item.id + '">AGENDAR</a></div></div></article>';
  }

  function renderTreatments() {
    const matched = treatments.filter(item => filter === 'todos' || item.category === filter);
    const visible = expanded || filter !== 'todos' ? matched : matched.slice(0,6);
    grid.innerHTML = visible.map(cardMarkup).join('');
    if (more) {
      more.hidden = filter !== 'todos' || expanded;
      more.textContent = 'VER TODOS OS TRATAMENTOS ↗';
    }
    if (count) count.textContent = 'Exibindo ' + visible.length + ' de ' + matched.length + ' tratamentos';
    $$('.filter').forEach(btn => {
      const selected = btn.dataset.treatmentFilter === filter;
      btn.classList.toggle('active',selected);
      btn.setAttribute('aria-pressed',String(selected));
    });
  }
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    filter = btn.dataset.treatmentFilter || 'todos';
    renderTreatments();
  }));
  more?.addEventListener('click', () => {expanded = true;renderTreatments();});
  renderTreatments();

  const detailDialog = $('#detail-dialog');
  grid?.addEventListener('click', event => {
    const details = event.target.closest('[data-treatment]');
    if (details) {
      const treatment = treatments.find(item => item.id === details.dataset.treatment);
      if (!treatment) return;
      $('#detail-category').textContent = labels[treatment.category] || 'Tratamentos';
      $('#detail-title').textContent = treatment.name;
      $('#detail-text').textContent = treatment.detail;
      const img = $('#detail-image');
      img.src = image(treatment.image,1050);
      img.alt = 'Imagem ilustrativa de procedimento odontológico';
      detailDialog?.showModal();
    }
    const book = event.target.closest('[data-book-treatment]');
    if (book) {
      const treatment = treatments.find(item => item.id === book.dataset.bookTreatment);
      const select = $('#form-treatment');
      if (select && treatment) {
        const map = {reabilitacao:'Implantes e próteses',ortodontia:'Ortodontia',estetica:'Estética dental',prevencao:'Prevenção e limpeza'};
        select.value = map[treatment.category] || 'Avaliação geral';
      }
    }
  });
  $('#close-detail')?.addEventListener('click', () => detailDialog?.close());
  $('#detail-book')?.addEventListener('click', () => detailDialog?.close());

  const articles = {
    ortodontia:{
      category:'ORTODONTIA',title:'Como funciona a avaliação para alinhar os dentes?',
      paragraphs:[
        'A consulta ortodôntica começa pela compreensão das necessidades e expectativas do paciente. O profissional observa o posicionamento dos dentes, a mordida e a saúde bucal como um todo.',
        'Dependendo do caso, o planejamento pode exigir documentação, fotografias, exames e modelos digitais. Essas informações ajudam a comparar as opções de aparelho e estabelecer uma sequência de cuidados.',
        'Durante a consulta, aproveite para perguntar sobre manutenção, higiene, acompanhamento e possíveis limitações de cada alternativa.'
      ]
    },
    prevencao:{
      category:'PREVENÇÃO',title:'Por que fazer acompanhamento odontológico regular?',
      paragraphs:[
        'As consultas de rotina permitem avaliar dentes, gengivas e outras estruturas da boca. Também são momentos para revisar hábitos de higiene e esclarecer dúvidas.',
        'A necessidade de limpeza, exames e outros cuidados muda conforme o histórico e as condições de cada pessoa. O intervalo entre visitas deve ser recomendado pelo dentista.',
        'Mudanças como sangramento gengival, sensibilidade persistente ou dor devem ser avaliadas, mesmo que a próxima consulta de rotina esteja distante.'
      ]
    },
    clareamento:{
      category:'ESTÉTICA',title:'Clareamento dental: o que conversar com seu dentista?',
      paragraphs:[
        'O clareamento dental envolve diferentes técnicas. A escolha depende da avaliação dos dentes, da saúde das gengivas e da identificação de condições que possam precisar de tratamento prévio.',
        'É importante conversar sobre possíveis episódios de sensibilidade, expectativas realistas e cuidados durante o processo.',
        'Produtos e métodos sem supervisão podem causar efeitos indesejados. Procure orientação profissional antes de iniciar qualquer procedimento.'
      ]
    }
  };
  const articleDialog = $('#article-dialog');
  $$('.read-link').forEach(btn => btn.addEventListener('click',() => {
    const article = articles[btn.dataset.article];
    if (!article) return;
    $('#article-category').textContent = article.category;
    $('#article-title').textContent = article.title;
    const content = $('#article-content');
    content.replaceChildren(...article.paragraphs.map(par => {
      const p = document.createElement('p');
      p.textContent = par;
      return p;
    }));
    articleDialog?.showModal();
  }));
  $('#close-article')?.addEventListener('click',() => articleDialog?.close());
  $('#article-back')?.addEventListener('click',() => articleDialog?.close());
  for (const dialog of [detailDialog,articleDialog]) {
    dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  }

  const locations = {
    RS:['Porto Alegre','Novo Hamburgo','Caxias do Sul'],
    SC:['Florianópolis','Blumenau'],
    SP:['São Paulo','Campinas']
  };
  const citySelect = $('#city-select'), stateSelect = $('#state-select'),
        formState = $('#form-state'), formCity = $('#form-city');
  function updateCities(stateSelectEl, citySelectEl) {
    const state = stateSelectEl.value;
    const cities = locations[state] || [];
    citySelectEl.replaceChildren(new Option(state?'Selecione uma cidade':'Selecione um estado',''));
    cities.forEach(city=>citySelectEl.add(new Option(city,city)));
    citySelectEl.disabled = !cities.length;
  }
  stateSelect?.addEventListener('change',()=>{
    updateCities(stateSelect,citySelect);
    $('#unit-result').hidden = true;
  });
  formState?.addEventListener('change',()=>updateCities(formState,formCity));
  $('#search-unit')?.addEventListener('click',()=>{
    const unitResult = $('#unit-result');
    if (!stateSelect.value || !citySelect.value) {
      unitResult.hidden = false;
      unitResult.replaceChildren();
      const p = document.createElement('p');
      p.textContent = 'Selecione o estado e a cidade para continuar.';
      unitResult.append(p);
      return;
    }
    const city = citySelect.value;
    unitResult.hidden = false;
    unitResult.replaceChildren();
    const name=document.createElement('strong');
    name.textContent='Unidade demonstrativa · '+city;
    const desc=document.createElement('p');
    desc.textContent='Localização ilustrativa. A clínica contratante poderá cadastrar endereços, telefones, mapas e horários reais.';
    const link=document.createElement('a');
    link.href='#agendamento';
    link.textContent='SOLICITAR CONTATO ↗';
    link.addEventListener('click',()=>{
      formState.value=stateSelect.value;
      updateCities(formState,formCity);
      formCity.value=city;
    });
    unitResult.append(name,desc,link);
  });

  const form=$('#booking-form'), output=$('#output-panel'), msg=$('#output-text');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const v=new FormData(form);
    const fields=[
      'Olá! Gostaria de solicitar uma avaliação odontológica.',
      '',
      'Nome: '+String(v.get('nome')||'').trim(),
      'Telefone: '+String(v.get('telefone')||'').trim(),
      'Cidade: '+String(v.get('cidade')||'')+' / '+String(v.get('estado')||''),
      'Interesse: '+String(v.get('tratamento')||'Avaliação geral')
    ];
    const notes=String(v.get('observacoes')||'').trim();
    if(notes)fields.push('Observações: '+notes);
    fields.push('','Gostaria de conhecer os horários disponíveis.');
    msg.value=fields.join('\n');
    output.hidden=false;
    $('#copy-status').textContent='';
    output.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'nearest'});
  });
  $('#copy-message')?.addEventListener('click',async()=>{
    if(!msg.value) return;
    try {
      if(navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(msg.value);
      }else{
        msg.focus();msg.select();
        if(!document.execCommand('copy'))throw new Error('Erro de cópia');
      }
      $('#copy-status').textContent='Copiado!';
    }catch{
      msg.focus();msg.select();
      $('#copy-status').textContent='Selecione o texto e copie manualmente.';
    }
  });

  const menu=$('.menu-button'),nav=$('#nav-main'), dropdown=$('.nav-dropdown'), toggle=$('#treatment-toggle');
  function closeMenu(){
    menu?.setAttribute('aria-expanded','false');
    menu?.setAttribute('aria-label','Abrir menu');
    nav?.classList.remove('is-open');
    dropdown?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  }
  menu?.addEventListener('click',()=>{
    const opening=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(opening));
    menu.setAttribute('aria-label',opening?'Fechar menu':'Abrir menu');
    nav.classList.toggle('is-open',opening);
  });
  toggle?.addEventListener('click',()=>{
    const opening=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(opening));
    dropdown.classList.toggle('open',opening);
  });
  $$('#nav-main a').forEach(link=>link.addEventListener('click',()=>{
    const c=link.dataset.category;
    if(c && labels[c]){
      filter=c;
      expanded=c!=='todos';
      renderTreatments();
    }
    closeMenu();
  }));
  document.addEventListener('click',e=>{
    if(!e.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  const nodes=$$('.reveal');
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window)){
    nodes.forEach(el=>el.classList.add('visible'));
  }else{
    const watcher=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('visible');watcher.unobserve(entry.target);}
      });
    },{threshold:.09,rootMargin:'0px 0px -25px 0px'});
    nodes.forEach(el=>watcher.observe(el));
  }
  const year=$('#year');
  if(year)year.textContent=String(new Date().getFullYear());
})();