// Editable configuration for PUB FOOD landing.
// TODO: replace placeholders below with real contacts before publishing.
export const pubFood = {
  whatsapp: {
    number: "5500000000000", // TODO: replace with real WhatsApp number (E.164, no + or spaces)
    display: "+55 (00) 00000-0000",
    defaultMessage:
      "Olá, conheci a PUB FOOD pelo site e gostaria de entender como estruturar melhor meu restaurante ou delivery.",
  },
  email: "contato@pubfood.com.br", // TODO
  instagram: "https://instagram.com/pubfood", // TODO
  instagramHandle: "@pubfood",
  domain: "pubfood.com.br", // TODO
  offIfoodUrl:
    "https://www.ifood.com.br/delivery/cabo-frio-rj/off-de-strogonoff-sambura-tamoios/a1800957-c5ee-40b2-b0eb-411e4b09b1c2",
};

export function buildWhatsAppUrl(extra?: string) {
  const msg = extra ? `${pubFood.whatsapp.defaultMessage}\n\n${extra}` : pubFood.whatsapp.defaultMessage;
  return `https://wa.me/${pubFood.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}

// Reviews extracted verbatim from the OFF de Strogonoff screenshots provided
// by the client. Do NOT edit copy; only add new verified entries here.
export type OffReview = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

export const offReviews: OffReview[] = [
  {
    name: "Renata",
    rating: 5,
    date: "10/06/2026",
    text: "A comida mais perfeita e caprichada de toda região. Sou fã número 1.",
  },
  {
    name: "Gabriel",
    rating: 5,
    date: "06/06/2026",
    text: "PERFEITOS! a comida estava incrível, sabor maravilhoso, veio tudo separadinho, bem embalado, quentinho e com mimo ♡ é nítido o cuidado que eles tem com o cliente e a comida, comprarei varias outras vezes com certeza.",
  },
  {
    name: "Michelle",
    rating: 5,
    date: "02/06/2026",
    text: "Olha que strogonoff maravilhoso que pedi, sem contar o capricho que eles enviam, e sem contar o sabor, nunca comi uma comida tão gostosa aqui em Unamar. Super indico.",
  },
  {
    name: "Caio",
    rating: 5,
    date: "25/04/2026",
    text: "Comida muito bem servida e com um tempero sensacional, nunca pedi uma comida pelo iFood que viesse tão boa aqui em Unamar quanto essa. Estão de parabéns, indico demais!!",
  },
  // TODO: adicionar novas avaliações apenas se estiverem publicamente
  // visíveis na página da OFF de Strogonoff no iFood.
];
