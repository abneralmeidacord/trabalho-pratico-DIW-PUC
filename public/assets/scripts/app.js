/* Lista de heróis do sistema vindo do JSON Server*/
const HEROES_URL = "/heroes";

/* Lista de habilidades do sistema vindo do JSON Server*/
const DETAILS_URL = "/details";

/* pega o id da div que será o output dos detalhes do Herói no HTML*/
const heroDetailsWrapper = document.getElementById("hero-details");

/* Formata o texto de categoria dos heróis */
function formatText(text) {
  if (!text) return "";

  const labels = {
    dps: "DPS",
    tank: "Tank",
    support: "Support",
  };

  return labels[text] || text.charAt(0).toUpperCase() + text.slice(1);
}

/* Pega o id da div que será o output dos cards de heróis no HTML*/
const heroesWrapper = document.getElementById("heroes-wrapper");

/* Cache global de heróis e habilidades para a busca */
let heroisCarregados = [];
let habilidadesPorHeroi = {};

/* Gera o HTML de um card de herói */
function heroCardHTML(hero) {
  return `
    <div class="col d-flex justify-content-center">
      <a class="hero-link w-100 text-decoration-none" href="detalhes.html?id=${hero.id}">
        <article class="hero-card d-flex flex-column align-items-center justify-content-center w-100">
          <img class="hero-image" src="${hero.hero_img}" alt="${hero.hero}">
          <div class="hero-info d-flex flex-row align-items-center justify-content-evenly w-100 my-2">
            <p class="hero-name mb-0">${hero.hero}</p>
          </div>
        </article>
      </a>
    </div>
  `;
}

/* Renderiza os cards de acordo com uma lista filtrada */
function renderFilteredCards(filtered, searchTerm) {
  const emptyEl = document.getElementById("heroes-search-empty");
  const termEl = document.getElementById("heroes-search-term");
  const countEl = document.getElementById("heroes-search-count");

  heroesWrapper.innerHTML = filtered.map(heroCardHTML).join("");

  if (searchTerm) {
    countEl.style.display = "block";
    countEl.textContent = `${filtered.length} hero${filtered.length !== 1 ? "es" : ""} found`;
  } else {
    countEl.style.display = "none";
  }

  if (filtered.length === 0 && searchTerm) {
    emptyEl.style.display = "block";
    termEl.textContent = searchTerm;
  } else {
    emptyEl.style.display = "none";
  }
}

/* Filtra heróis pelo texto pesquisado (nome ou habilidade) */
function filterHeroes(searchTerm) {
  if (!searchTerm.trim()) {
    return heroisCarregados;
  }

  const term = searchTerm.toLowerCase().trim();

  return heroisCarregados.filter((hero) => {
    /* Testa o nome do herói */
    if (hero.hero.toLowerCase().includes(term)) return true;

    /* Testa as habilidades do herói */
    const abilities = habilidadesPorHeroi[hero.id];
    if (!abilities) return false;

    return Object.values(abilities).some(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        item.name &&
        item.name.toLowerCase().includes(term),
    );
  });
}

/* Inicializa a barra de busca */
function initSearch() {
  const searchInput = document.getElementById("heroes-search");
  const clearBtn = document.getElementById("heroes-search-clear");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const term = searchInput.value;
    clearBtn.style.display = term ? "flex" : "none";
    const filtered = filterHeroes(term);
    renderFilteredCards(filtered, term);
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.focus();
    renderFilteredCards(heroisCarregados, "");
  });
}

/* Função assíncrona para renderizar os cards de heróis vindos do json-server*/
async function renderHeroCards() {
  /* Tenta carregar, se não carregar dá um erro de busca dos heróis, e se não encontrar nenhum herói erro de lista vazia */
  try {
    const [heroesRes, detailsRes] = await Promise.all([
      fetch(HEROES_URL),
      fetch(DETAILS_URL),
    ]);

    if (!heroesRes.ok || !detailsRes.ok) {
      throw new Error("Erro ao buscar heróis");
    }

    const heroes = await heroesRes.json();
    const details = await detailsRes.json();

    if (heroes.length === 0) {
      heroesWrapper.innerHTML = "";
      console.log("Não foi possível achar heróis");
      return;
    }

    heroisCarregados = heroes;

    /* Indexa habilidades por heroId para busca rápida */
    habilidadesPorHeroi = {};
    for (const det of details) {
      habilidadesPorHeroi[det.heroId] = det;
    }

    heroesWrapper.innerHTML = heroes.map(heroCardHTML).join("");

    initSearch();

    return heroes;
  } catch (erro) {
    /* Se não for possível carregar algum card dá console.log com um erro */
    console.error("Erro ao carregar heróis:", erro);
    return [];
  }
}

/* Função pra contar heróis por classe e função */

function countHeroesByClassAndFunc(heroes) {
  const contagem = {};

  for (const hero of heroes) {
    const classe = formatText(hero.hero_class);
    const funcao = formatText(hero.hero_func);
    const chave = `${classe} - ${funcao}`;

    contagem[chave] = (contagem[chave] || 0) + 1;
  }

  return contagem;
}

/* Função pra renderizar gráficos de heróis */
function renderHeroesChart(heroes) {
  const chartCanvas = document.getElementById("heroesChart");

  if (!chartCanvas || !window.Chart || !heroes || heroes.length === 0) {
    return;
  }

  const contagem = countHeroesByClassAndFunc(heroes);
  const labels = Object.keys(contagem);
  const dados = Object.values(contagem);

  const orangeShades = [
    "#ffb347",
    "#f99e1a",
    "#f28c00",
    "#e67e00",
    "#d96f00",
    "#c96500",
    "#b85c00",
    "#a85300",
    "#994a00",
    "#8a4200",
    "#7a3900",
  ];

  new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Heroes",
          data: dados,
          backgroundColor: labels.map(
            (label, index) => orangeShades[index % orangeShades.length],
          ),
          borderColor: "#b37417",
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.raw} heroes`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#43484c",
            font: {
              weight: "bold",
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#43484c",
          },
          grid: {
            color: "#f3dfc1",
          },
        },
      },
    },
  });
}

/* Função assíncrona para renderizar os detalhes do herói selecionado vindos da home e do json-server*/
async function renderHeroDetails() {
  /* Tenta carregar, se não carregar dá um erro de busca da habilidade do herói, e se não encontrar nenhum herói e nem a habilidade dá erro de herói inválido */
  try {
    const params = new URLSearchParams(window.location.search);
    const heroId = Number(params.get("id"));

    const heroResponse = await fetch(`${HEROES_URL}/${heroId}`);
    const abilitiesResponse = await fetch(`${DETAILS_URL}?heroId=${heroId}`);

    /* Erro de habilidades não achadas */
    if (!heroResponse.ok || !abilitiesResponse.ok) {
      throw new Error("Erro ao buscar habilidades do herói");
    }

    const selectedHero = await heroResponse.json();
    const abilitiesData = await abilitiesResponse.json();

    const selectedAbilities = abilitiesData[0];

    /* Erro de herói inválido */
    if (!selectedHero || !selectedHero.id || !selectedAbilities) {
      heroDetailsWrapper.innerHTML = `
        <div class="details-error text-center">
          <h1>Hero not found</h1>
          <p>Go back to the homepage and select a valid character.</p>
          <a class="details-button" href="index.html#heroes">Back to heroes</a>
        </div>
      `;
      return;
    }

    /* Formata título da página dos heróis, pra ter o nome do herói selecionado */
    document.title = `${selectedHero.hero} | Hero detail`;

    /* Filtra a lista de habilidades, pra pegar somente o nome e descrição */
    const listaAbilities = Object.values(selectedAbilities).filter(
      (item) => typeof item === "object" && item.name && item.description,
    );

    /* Mapping das habilidades em cards */
    const abilitiesHTML = listaAbilities
      .map(
        (ability) => `
          <article class="ability-card">
            <h3>${ability.name}</h3>
            <p>${ability.description}</p>
          </article>
        `,
      )
      .join("");

    /* Mapping das informações no html */
    heroDetailsWrapper.innerHTML = `
      <article class="hero-details-card">
        <div class="hero-details-header">
          <div class="hero-details-image-wrapper">
            <img src="${selectedHero.hero_img}" alt="${selectedHero.hero}">
          </div>

          <div class="hero-details-info">
            <p class="details-tag">Hero Profile</p>
            <h1>${selectedHero.hero}</h1>
            <div class="details-meta">
              <div>
                <span>Class</span>
                <strong>${formatText(selectedHero.hero_class)}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>${formatText(selectedHero.hero_func)}</strong>
              </div>
            </div>
            <a class="details-button" href="index.html#heroes">Back to heroes</a>
          </div>
        </div>

        <div class="abilities-section">
          <h2>Abilities</h2>
          <div class="abilities-grid">
            ${abilitiesHTML}
          </div>
        </div>
      </article>
    `;
  } catch (erro) {
    /* Erro de carregamento no card de habilidades */
    console.error("Erro ao carregar habilidades do herói:", erro);

    heroDetailsWrapper.innerHTML = `
      <div class="details-error text-center">
        <h1>Error Loading Hero Details</h1>
        <p>Unable to get this character details.</p>
        <a class="details-button" href="index.html#heroes">Back to heroes</a>
      </div>
    `;
  }
}

/* Função init que carrega os cards de heróis automáticamente */
async function init() {
  const heroes = await renderHeroCards();
  renderHeroesChart(heroes);
}

if (heroesWrapper) {
  init();
}

if (heroDetailsWrapper) {
  renderHeroDetails();
}