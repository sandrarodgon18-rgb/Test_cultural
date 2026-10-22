// Épocas y perfil de valores en 3 ejes, rango -10..+10.
// Ejes: ordenLibertad (Orden ↔ Libertad), tradicionCambio (Tradición ↔ Cambio),
//       individuoComunidad (Individuo ↔ Comunidad)
const AXES = [
  { key: 'ordenLibertad',     label: 'Orden y autoridad',  left: 'Orden y autoridad',     right: 'Libertad individual' },
  { key: 'tradicionCambio',   label: 'Tradición y raíces', left: 'Tradición y raíces',    right: 'Cambio y progreso' },
  { key: 'individuoComunidad',label: 'El individuo',       left: 'El individuo',          right: 'La comunidad' }
];

const CULTURES = [
  {
    id: 'A',
    name: 'Antigüedad clásica',
    place: 'Mediterráneo',
    period: 'Siglos V–III a. C.',
    emoji: '\u{1F3DB}️',
    tagline: 'El debate en la plaza, los banquetes y la medida humana de las cosas.',
    profile: { ordenLibertad: 4, tradicionCambio: -1, individuoComunidad: 3 },
    description: 'La Antigüedad clásica fue el mundo del ágora, la asamblea, la filosofía y los grandes juegos. Se discutía en público, se votaba, se celebraba la palabra bien dicha y el cuerpo sano. La religión y la costumbre seguían marcando el calendario, y la ciudad-estado exigía lealtad: la libertad era de ciudadanos, no de todos. Pero la medida de todo seguía siendo el ser humano, aquí y ahora.',
    fit: [
      'Disfrutas del debate, de la palabra y de pensar en voz alta con otros.',
      'Te atrae una vida con ritmo: cuerpo, mente, fiesta y participación.',
      'Valoras la cultura clásica y el sentido de comunidad de la ciudad.'
    ],
    friction: [
      'La religión y la costumbre pesan más de lo que te gustaría.',
      'Esa libertad era solo para una parte de la población.'
    ]
  },
  {
    id: 'B',
    name: 'Edad Media',
    place: 'Europa',
    period: 'Siglos V–XV',
    emoji: '\u{1F3F0}',
    tagline: 'Castillos, fe, gremios y leyendas alrededor de la hoguera.',
    profile: { ordenLibertad: -7, tradicionCambio: -8, individuoComunidad: 5 },
    description: 'La Edad Media era un mundo de orden claro: señor, siervo, monje y artesano, cada cual con su lugar y su deber. La fe lo envolvía todo y las tradiciones se transmitían sin cuestionarse. Pero también había comunidad de verdad: el gremio, el pueblo, la fiesta de la fiesta, la catedral como obra común de generaciones. La hoguera, el juglar y la aventura del caballero eran el cine de la época.',
    fit: [
      'Te reconforta un mundo ordenado donde las cosas tienen sentido y lugar.',
      'Valoras la tradición, la fe o al menos el arraigo y la lealtad al grupo.',
      'Disfrutas de las historias, las leyendas y la vida en comunidad.'
    ],
    friction: [
      'La falta de libertad individual y el estamento fijo te asfixiarían.',
      'El peso de la religión sobre la vida cotidiana sería difícil de soportar.'
    ]
  },
  {
    id: 'C',
    name: 'Renacimiento y Siglo de Oro',
    place: 'Italia y España',
    period: 'Siglos XV–XVII',
    emoji: '\u{1F3AD}',
    tagline: 'Genios, teatro, poesía y mucho ingenio bajo la sombra de los poderosos.',
    profile: { ordenLibertad: -1, tradicionCambio: 2, individuoComunidad: -3 },
    description: 'El Renacimiento y el Siglo de Oro fueron la época del ingenio: el pintor, el poeta, el inventor y el dramaturgo como figuras centrales. Se recuperaba a los clásicos y se miraba el mundo con ojos nuevos, con teatro en las plazas, poesía en las cortes y mapas con zonas en blanco. El poder seguía siendo del rey y de la nobleza, pero el talento individual empezaba a abrirse paso por mérito propio.',
    fit: [
      'Te atrae la creación artística y el culto al talento individual.',
      'Disfrutas del teatro, la poesía, la pintura y el ingenio verbal.',
      'Te gusta lo refinado, lo bello y el lujo bien entendido.'
    ],
    friction: [
      'El poder de la monarquía y la nobleza te dejaría poco margen.',
      'El peso de la religión y la censura frenaría tu expresión.'
    ]
  },
  {
    id: 'D',
    name: 'Revoluciones y Romanticismo',
    place: 'Europa y América',
    period: 'Siglos XVIII–XIX',
    emoji: '\u{1F4DC}',
    tagline: 'Manifiestos, barricadas y el corazón apasionado del Romanticismo.',
    profile: { ordenLibertad: 8, tradicionCambio: 7, individuoComunidad: -2 },
    description: 'La época de las revoluciones y el Romanticismo fue el triunfo de las ideas y del sentimiento. Discursos que encienden multitudes, plumas que escriben manifiestos, barricadas y constituciones. El individuo se rebelaba contra lo heredado: su derecho a la libertad, su voz propia, su pasión. Orquestas románticas, novelas de aventuras y la conciencia de que el mundo se puede cambiar.',
    fit: [
      'Crees en las ideas y en el poder de la palabra para cambiar el mundo.',
      'Valoras la libertad individual por encima de la tradición.',
      'Te mueve la pasión, el idealismo y la justicia.'
    ],
    friction: [
      'La época fue violenta: guerras, represión y ciclos revolucionarios.',
      'El individualismo romántico puede dejar solo al que no encuentra causa.'
    ]
  },
  {
    id: 'E',
    name: 'Años 20 y 30',
    place: 'Occidente',
    period: 'Entreguerras',
    emoji: '\u{1F3B7}',
    tagline: 'Jazz, charlestón y una libertad que se apura antes de la crisis.',
    profile: { ordenLibertad: 6, tradicionCambio: 5, individuoComunidad: -2 },
    description: 'Los Años 20 y 30 fueron la fiesta antes del desastre: jazz en los clubes, charlestón, gramófonos, cine mudo y detectives de novela negra. Las ciudades bullían, las mujeres cortaban el pelo y las normas se agrietaban. Luego llegó la crisis y el reloj empezó a correr en contra. Una época de libertad vivida con los cinco sentidos, y de la melancolía de saber que no iba a durar.',
    fit: [
      'Disfrutas de la modernidad, el jazz y la vida urbana.',
      'Valoras la libertad social y romper convenciones.',
      'Te atrae el misterio, la elegancia y el aire de película.'
    ],
    friction: [
      'La crisis económica y la tensión política de los 30 pesan sobre la fiesta.',
      'La libertad de la época era sobre todo de quien tenía dinero.'
    ]
  },
  {
    id: 'F',
    name: 'Guerra Fría y años 60-80',
    place: 'Global',
    period: '1945–1989',
    emoji: '\u{1F4F1}',
    tagline: 'Rock, sintetizadores, carrera espacial y un mundo partido en dos.',
    profile: { ordenLibertad: 3, tradicionCambio: 6, individuoComunidad: 4 },
    description: 'La Guerra Fría y los años 60-80 fueron el mundo dividido en dos bloques, pero también la era del rock, los movimientos sociales, la carrera espacial y los primeros sintetizadores. Cantautores con mensaje, manifestaciones, tecnología que cambiaba la vida y la sensación de que el futuro ya está aquí. Una época de ideales chocando con la realidad, de libertad y control al mismo tiempo.',
    fit: [
      'Te mueven las ideas, la música con mensaje y los movimientos sociales.',
      'Valoras tanto la libertad individual como el sentido de comunidad.',
      'Te atrae la tecnología, el progreso y la cultura pop.'
    ],
    friction: [
      'La tensión nuclear y la división del mundo generan ansiedad.',
      'La velocidad del cambio puede agotar a quien busca calma.'
    ]
  }
];
