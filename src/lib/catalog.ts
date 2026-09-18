import agro from "@/assets/products/category-27.png";
import auto from "@/assets/products/category-28.png";
import hospital from "@/assets/products/category-29.png";
import laundry from "@/assets/products/category-30.png";
import cleaning from "@/assets/products/category-32.png";
import market from "@/assets/products/category-33.png";
import accessories from "@/assets/products/category-37.png";
import furniture from "@/assets/products/category-36.png";

export type Category = {
  id: string;
  label: string;
  code: string;
  image: string;
  description: string;
  products: string[];
};

export const categories: Category[] = [
  {
    id: "agropecuaria",
    label: "Agropecuária",
    code: "01",
    image: agro,
    description: "Higiene e desempenho para operações rurais.",
    products: ["Cloro Líquido Acqua 12", "Cloro Líquido Acqua", "Acqua Plus S1 Detergente Desincrustante Ácido", "Acqua 700", "Soda Indaiá"],
  },
  {
    id: "automotiva",
    label: "Automotiva",
    code: "02",
    image: auto,
    description: "Limpeza técnica para frotas e estruturas.",
    products: ["Limpa Concreto Acqua Desincrustante Ácido", "CR40 Detergente Automotivo", "Acqua Baú", "Shampoo Automotivo Acqua Cremoso", "Limpa Pneus Acqua Pretinho", "Desengraxante Acqua Pan Comum", "Acqua Painel Gel"],
  },
  {
    id: "hospitalar",
    label: "Hospitalar",
    code: "03",
    image: hospital,
    description: "Protocolos de limpeza para ambientes críticos.",
    products: ["Acqua 12 Detergente", "Acqua Pinho Gel", "Acqua Lavanda Gel", "Desinfetante Acqua Pinho", "Desinfetante Acqua Marine", "Desinfetante Acqua Lavanda", "Desinfetante Acqua Floral", "Desinfetante Acqua Eucalipto", "Cloro Acqua 1%", "Vortez Detergente Flotador", "Vortex Detergente Clorado", "Álcool em Gel"],
  },
  {
    id: "lavanderia",
    label: "Lavanderia",
    code: "04",
    image: laundry,
    description: "Sistemas de lavagem, cuidado e acabamento.",
    products: ["Cloro Líquido Acqua", "Cloro Líquido Acqua 12", "Amaciante Acqua Pink", "Amaciante Acqua Blue", "Lava Roupas Acqua", "Acqua Oxifer", "Isollon", "Alka Matic Peroxitan", "Alka Matic 3P", "Alka Matic CH100", "Alka Matic Acid", "Alka Matic Clor"],
  },
  {
    id: "limpeza-geral",
    label: "Limpeza Geral",
    code: "05",
    image: cleaning,
    description: "Suprimentos essenciais para alto giro.",
    products: ["Pedra Sanitária PC 12x18g", "Esponja Dupla Face Wish", "Esponja de Fibra 10un", "Lã de Aço 44g Aço Bom", "Saco Reforçado 50/200L", "Saco para Lixo Riofort 15/30L", "Saco para Lixo Lixo Lix", "Luvas Látex e Multiuso Bompack", "Papéis Higiênicos Institucionais e Varejo"],
  },
  {
    id: "supermercados",
    label: "Supermercados",
    code: "06",
    image: market,
    description: "Linha fracionada e de gôndola.",
    products: ["Acqua Lavanda Gel", "Pinho Gel", "Desinfetantes variados", "Amaciantes Carinho", "Amaciante Pink", "Amaciante Blue", "Soda Indaiá", "Essências"],
  },
  {
    id: "tratamento-piscina",
    label: "Tratamento de Piscina",
    code: "07",
    image: cleaning,
    description: "Precisão química para água cristalina.",
    products: ["Kit Teste Alcalinidade", "Kit Teste pH/Cloro", "Bicarbonato de Sódio", "Elevador de pH Barrilha", "Sulfato de Alumínio", "Limpa Bordas", "Hidrofloc", "Algicida Manutenção", "Algicida Choque", "Cloro Granulado Hidrosan"],
  },
  {
    id: "acessorios-piscina",
    label: "Acessórios de Piscina",
    code: "08",
    image: accessories,
    description: "Equipamentos selecionados para lazer e manutenção.",
    products: ["Guarda-Sol Fashion Mor", "Ombrelone 2.40m", "Filtros Sodramar e Nautilus", "Mangueiras Roseflex Azul e Branca / Azul Flex", "Válvula Cabeçote Filtro", "Moto Bombas Nautilus", "Fluidra Veico e Sodramar", "Degraus Plásticos Clarear"],
  },
  {
    id: "moveis-equipamentos",
    label: "Móveis & Equipamentos",
    code: "09",
    image: furniture,
    description: "Conforto, lazer e soluções para saunas.",
    products: ["Resistência Elétrica Sauna Seca/Sodramar", "Portas para Saunas Sodramar", "Sauna Compact Line Inox Sodramar", "Sauna Gás Baby Pop Socalor", "Mesa Infantil Decorada", "Cadeiras Infantis", "Mesa Monobloco", "Espreguiçadeira Pitangui", "Banquetas Araxá", "Cadeiras Bistrô Ponte Nova", "Cadeira Poltrona Boa Vista"],
  },
];

export const totalProducts = categories.reduce((total, category) => total + category.products.length, 0);

export const units = [
  { short: "Matriz", city: "Teófilo Otoni — MG", address: "Av. Luiz Boali, 3033 — Castro Pires", zip: "CEP 39.801-605", phone: "(33) 3522.1919", tel: "553335221919" },
  { short: "Filial Centro", city: "Teófilo Otoni — MG", address: "Rua Engenheiro Lindemberg, 26 — Centro", zip: "CEP 39.800-088", phone: "(33) 3521.1983", tel: "553335211983" },
  { short: "Filial BA", city: "Teixeira de Freitas — BA", address: "Rua Almirante Tamandaré, 71 — Bela Vista", zip: "CEP 45.997-110", phone: "(73) 3591.9978", tel: "557335919978" },
];