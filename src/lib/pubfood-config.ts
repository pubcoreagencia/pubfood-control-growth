// Editable configuration for PUB FOOD landing.
// TODO: replace placeholders below with real contacts before publishing.
export const pubFood = {
  whatsapp: {
    // TODO: substituir pelo número oficial da PUB FOOD (formato E.164, sem + nem espaços)
    number: "5500000000000",
    display: "+55 (00) 00000-0000",
    defaultMessage:
      "Olá, conheci a PUB FOOD pelo site e gostaria de entender como estruturar melhor meu restaurante ou delivery.",
  },
  // TODO: substituir pelos contatos definitivos
  email: "contato@pubfood.com.br",
  instagram: "https://instagram.com/pubfood",
  instagramHandle: "@pubfood",
  domain: "pubfood.com.br",
  offIfoodUrl:
    "https://www.ifood.com.br/delivery/cabo-frio-rj/off-de-strogonoff-sambura-tamoios/a1800957-c5ee-40b2-b0eb-411e4b09b1c2",
};

export function buildWhatsAppUrl(extra?: string) {
  const msg = extra
    ? `${pubFood.whatsapp.defaultMessage}\n\n${extra}`
    : pubFood.whatsapp.defaultMessage;
  return `https://wa.me/${pubFood.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}
