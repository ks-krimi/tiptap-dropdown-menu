export type Menu = {
  id: number;
  label: string;
  value?: string;
  child: Menu[] | [];
};

export const menu: Menu[] = [
  {
    id: 1,
    label: "Context",
    child: [
      {
        id: 11,
        label: "Commande",
        child: [
          {
            id: 111,
            label: "Commande n°1",
            child: [],
          },
        ],
      },
      {
        id: 12,
        label: "Client",
        child: [
          {
            id: 121,
            label: "Compte Actif",
            child: [],
          },
          {
            id: 122,
            label: "Identifiant Client",
            child: [],
          },
          {
            id: 123,
            label: "Nom de famille",
            child: [],
          },
          {
            id: 124,
            label: "Nombre de commandes",
            child: [],
          },
          {
            id: 125,
            label: "Téléphone",
            child: [],
          },
          {
            id: 126,
            label: "CA total",
            child: [],
          },
          {
            id: 127,
            label: "eMail",
            child: [],
          },
        ],
      },
      {
        id: 13,
        label: "Facturation",
        child: [
          {
            id: 131,
            label: "Facturation n°1",
            child: [],
          },
          {
            id: 318,
            label: "Facturation n°2",
            child: [],
          },
        ],
      },
      {
        id: 14,
        label: "Formulaire",
        child: [
          {
            id: 141,
            label: "Formulaire n°1",
            child: [],
          },
          {
            id: 142,
            label: "Formulaire n°2",
            child: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Contact",
    child: [
      {
        id: 21,
        label: "Civilité",
        value: "Monsieur",
        child: [],
      },
      {
        id: 22,
        label: "Prénom",
        value: "Herifiandry Marc Nico",
        child: [],
      },
      {
        id: 23,
        label: "Nom de famille",
        value: "FANOMEZANTSOA",
        child: [],
      },
      {
        id: 24,
        label: "eMail",
        value: "jean.dupont@example.com",
        child: [],
      },
      {
        id: 25,
        label: "Numéro de téléphone portable",
        value: "0123456789",
        child: [],
      },
      {
        id: 26,
        label: "Numéro de téléphone",
        value: "0123456789",
        child: [],
      },
      {
        id: 27,
        label: "Liste noire",
        value: "black-list",
        child: [],
      },
    ],
  },
  {
    id: 3,
    label: "Profil",
    child: [
      {
        id: 31,
        label: "Nouvelle Commande",
        child: [
          {
            id: 311,
            label: "Adresse",
            value: "123 Rue de l'Exemple, Paris",
            child: [],
          },
        ],
      },
      {
        id: 32,
        label: "Historique",
        child: [
          {
            id: 321,
            label: "Date de naissance",
            value: "1990-01-01",
            child: [],
          },
        ],
      },
    ],
  },
];
