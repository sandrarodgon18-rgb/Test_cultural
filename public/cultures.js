// Perfiles culturales en 6 ejes de valores, rango -10..+10.
// Ejes: libertad, tradicion, comunidad, apertura, igualdad, naturaleza
const AXES = [
  { key: 'libertad',  label: 'Libertad individual',   left: 'Orden y autoridad', right: 'Libertad individual' },
  { key: 'tradicion', label: 'Tradición',             left: 'Progreso secular',  right: 'Tradición y religión' },
  { key: 'comunidad', label: 'Comunidad',             left: 'Individualismo',    right: 'Colectivismo' },
  { key: 'apertura',  label: 'Apertura al mundo',     left: 'Localismo',         right: 'Cosmopolitismo' },
  { key: 'igualdad',  label: 'Igualdad',              left: 'Jerarquía',         right: 'Igualdad' },
  { key: 'naturaleza',label: 'Naturaleza',            left: 'Progreso material', right: 'Armonía con la naturaleza' }
];

const CULTURES = [
  {
    id: 'atenas',
    name: 'Atenas clásica',
    place: 'Grecia',
    period: 'Siglo V a. C.',
    emoji: '\u{1F3DB}️',
    tagline: 'La cuna de la democracia, la filosofía y el debate público.',
    profile: { libertad: 6, tradicion: 2, comunidad: 4, apertura: 2, igualdad: 2, naturaleza: 1 },
    description: 'En la Atenas de Pericles se votaba en asamblea, se discutía en el Ágora y el ciudadano participaba directamente en las decisiones de la polis. La tragedia, la comedia, la historia y la filosofía nacieron allí. Eso sí: esa libertad era solo para ciudadanos varones; mujeres, metecos y esclavos quedaban fuera, y la religión cívica seguía marcando el calendario de la vida.',
    fit: [
      'Disfrutas del debate y de decidir en común, no de que otros decidan por ti.',
      'Valoras la cultura, el pensamiento crítico y la participación directa.',
      'Te sientes bien en una comunidad donde todo el mundo se conoce y se exige compromiso.'
    ],
    friction: [
      'Tendrías que aceptar que solo una parte de la población tiene voz y voto.',
      'La presión del grupo en una ciudad pequeña puede asfixiar al individuo.'
    ]
  },
  {
    id: 'roma',
    name: 'Roma imperial',
    place: 'Mediterráneo',
    period: 'Siglos I–III d. C.',
    emoji: '\u{1F3DB}️',
    tagline: 'Ley, orden e ingeniería al servicio de un imperio multicultural.',
    profile: { libertad: -4, tradicion: 3, comunidad: 2, apertura: 4, igualdad: -5, naturaleza: -6 },
    description: 'Roma construyó calzadas, acueductos y ciudades modelo desde Britania hasta Siria. Su gran revolución fue el derecho: normas escritas, contratos y ciudadanía extendida a los pueblos conquistados, lo que hacía del imperio un espacio de convivencia y comercio enorme. A cambio, la sociedad era profundamente jerárquica: emperador, senadores, plebe y esclavos, sin derecho a protestar demasiado.',
    fit: [
      'Te atraen el orden, la ley bien escrita y las cosas que funcionan.',
      'Te sientes cómodo en sociedades diversas donde manda el mérito y la disciplina.',
      'Te gusta la ambición de construir obras que duren siglos.'
    ],
    friction: [
      'La autoridad del poder fuerte y la poca voz del ciudadano común te pesarían.',
      'La desigualdad era brutal y la esclavitud, cotidiana.'
    ]
  },
  {
    id: 'persia',
    name: 'Persia aqueménida',
    place: 'Oriente Medio y Asia Central',
    period: 'Siglos VI–IV a. C.',
    emoji: '\u{1F3DB}️',
    tagline: 'El primer imperio multicultural: tolerancia y administración sabia.',
    profile: { libertad: -2, tradicion: 4, comunidad: 3, apertura: 7, igualdad: -4, naturaleza: -1 },
    description: 'El imperio de Ciro el Grande se distinguió por no imponer su religión ni su cultura a los pueblos conquistados: cada región conservaba sus costumbres, templos y lenguas, y solo debía tributar y mantener el orden. La ruta de la seda y el famoso camino real conectaban mercados y caravanas de todo el mundo conocido. Era una sociedad tolerante, pero muy vertical: el rey de reyes y sus sátrapas mandaban de arriba abajo.',
    fit: [
      'Valoras la convivencia entre culturas distintas sin que nadie tenga que renunciar a lo suyo.',
      'Te gusta la estabilidad de una administración bien organizada.',
      'Te sientes bien en sociedades con fuerte arraigo espiritual y respeto a la costumbre.'
    ],
    friction: [
      'La obediencia al poder absoluto y la jerarquía rígida te resultarían incómodas.',
      'Tendrías poca capacidad de cambiar las cosas desde abajo.'
    ]
  },
  {
    id: 'cordoba',
    name: 'Califato de Córdoba',
    place: 'Al-Ándalus',
    period: 'Siglos X–XI',
    emoji: '\u{1F3DB}️',
    tagline: 'Ciencia, poesía y convivencia de las tres culturas.',
    profile: { libertad: -1, tradicion: 7, comunidad: 4, apertura: 6, igualdad: -2, naturaleza: -1 },
    description: 'Bajo al-Andalus, Córdoba fue una de las ciudades más brillantes de Europa: bibliotecas con cientos de miles de volúmenes, traducciones de griego y árabe, avances en medicina, astronomía y agricultura de regadío, y una vida cultural en la que musulmanes, judíos y cristianos convivieron y trabajaron juntos. La mezquita, los baños y los jardines eran el corazón de una ciudad refinada. La igualdad, eso sí, no existía: la ley dependía de tu religión.',
    fit: [
      'Te atrae una sociedad culta que valora el conocimiento y el saber compartido.',
      'Convives bien con gente de creencias distintas si hay respeto mutuo.',
      'Disfrutas de la belleza cotidiana: la música, el jardín, la palabra bien dicha.'
    ],
    friction: [
      'La vida estaba regida por la religión y los cargos públicos no estaban abiertos a todos.',
      'La desigualdad legal entre musulmanes y no musulmanes te chocaría.'
    ]
  },
  {
    id: 'edo',
    name: 'Japón Edo',
    place: 'Japón',
    period: 'Siglos XVII–XIX',
    emoji: '\u{1F3EF}',
    tagline: 'Doscientos años de paz, orden y perfección artesanal.',
    profile: { libertad: -7, tradicion: 8, comunidad: 6, apertura: -8, igualdad: -6, naturaleza: 4 },
    description: 'Bajo los Tokugawa, Japón cerró sus puertas al exterior y vivió un largo período de paz interior. La sociedad estaba organizada en estamentos, pero también en gremios y barrios muy cohesionados: la lealtad al grupo, la disciplina y el cuidado de lo pequeño se elevaron a arte. De esa época salen el kabuki, el haiku, el ikebana y la cocina refinada que hoy conocemos, en armonía con las estaciones y la naturaleza.',
    fit: [
      'Te reconforta un entorno ordenado, seguro y donde todo tiene su lugar.',
      'Valoras la disciplina, el oficio bien aprendido y la lealtad al grupo.',
      'Encuentras calma en los rituales, las estaciones y los detalles cuidados.'
    ],
    friction: [
      'El aislamiento y la cerrazón al exterior te ahogarían.',
      'La presión social y la jerarquía estamental dejan poco espacio al individuo.'
    ]
  },
  {
    id: 'venecia',
    name: 'Venecia renacentista',
    place: 'Italia',
    period: 'Siglos XV–XVI',
    emoji: '\u{1F3DB}️',
    tagline: 'La república de mercaderes: pragmatismo, comercio y lujo.',
    profile: { libertad: 3, tradicion: 3, comunidad: 2, apertura: 7, igualdad: -6, naturaleza: -2 },
    description: 'Venecia fue durante siglos el gran intermediario entre Europa y Oriente: su arsenal producía barcos en cadena, sus mercaderes circulaban por todo el Mediterráneo y su república, con leyes y consejos, inspiró a Maquiavelo y Montesquieu. Era una ciudad cosmopolita, práctica y amante del arte y del placer. El gobierno, sin embargo, estaba en manos de unas pocas familias aristocráticas elegidas entre sí.',
    fit: [
      'Eres práctico, negociador y te mueves bien en entornos comerciales y diversos.',
      'Te atrae una vida culta, refinada y con acceso a lo mejor de varias culturas.',
      'Prefieres las repúblicas con reglas claras a los dogmas.'
    ],
    friction: [
      'El poder estaba reservado a una oligarquía: la movilidad social era mínima.',
      'El materialismo y el pragmatismo pueden vaciar de sentido la vida cotidiana.'
    ]
  },
  {
    id: 'iroqueses',
    name: 'Haudenosaunee (iroqueses)',
    place: 'Norteamérica',
    period: 'Siglos XV–XIX',
    emoji: '\u{1F333}',
    tagline: 'Democracia de consenso, poder de las mujeres y visión a siete generaciones.',
    profile: { libertad: 5, tradicion: 1, comunidad: 8, apertura: 0, igualdad: 7, naturaleza: 9 },
    description: 'La Confederación iroquesa se gobernaba mediante un gran consejo de representantes elegidos, con decisiones tomadas por consenso y con las mujeres (clan materno) teniendo poder real para nombrar y destituir a los caciques. Sus leyes miraban las consecuencias a siete generaciones futuras. Vivían en contacto estrecho con el bosque, sin acumulación de riqueza ni jerarquías marcadas; su modelo inspiró más tarde a la democracia estadounidense.',
    fit: [
      'Creéis que las decisiones deben tomarse entre todos y escuchando a todos.',
      'Te importa el largo plazo: el mundo que dejaremos a quienes vengan después.',
      'Te sientes bien en sociedades igualitarias, sin ricos ni pobres marcados.'
    ],
    friction: [
      'La ausencia de Estado moderno, sanidad y tecnología te resultaría exigente.',
      'La toma de decisiones por consenso es lenta para quien quiere ir rápido.'
    ]
  },
  {
    id: 'suiza',
    name: 'Suiza',
    place: 'Europa',
    period: 'Actualidad',
    emoji: '\u{1F1E8}\u{1F1ED}',
    tagline: 'Democracia directa, neutralidad y calidad de vida.',
    profile: { libertad: 5, tradicion: 3, comunidad: 3, apertura: 3, igualdad: 4, naturaleza: 6 },
    description: 'Suiza se gobierna con referéndums varias veces al año: la ciudadanía decide directamente sobre leyes, impuestos y tratados. Es un país de cantones muy diversos que conviven en consenso, neutral en los conflictos y con una de las calidades de vida más altas del mundo. Sus Alpes, trenes puntuales y servicios públicos fiables reflejan una cultura que valora la prudencia, el ahorro y el acuerdo por encima del espectáculo.',
    fit: [
      'Quieres poder votar las decisiones importantes y que el gobierno rinda cuentas.',
      'Valoras la estabilidad, la neutralidad y que las cosas funcionen sin ruido.',
      'Te gusta convivir en diversidad (idiomas, culturas) con reglas claras y pactadas.'
    ],
    friction: [
      'El consenso constante y el ritmo pausado pueden frustrar a quien busca cambios rápidos.',
      'La tradición local y el sentido del orden pesan más que la improvisación.'
    ]
  },
  {
    id: 'islandia',
    name: 'Islandia',
    place: 'Europa nórdica',
    period: 'Actualidad',
    emoji: '\u{1F1E6}\u{1F1F8}',
    tagline: 'Igualdad real, libertad individual y paisaje salvaje.',
    profile: { libertad: 8, tradicion: -4, comunidad: 5, apertura: 6, igualdad: 8, naturaleza: 7 },
    description: 'Islandia combina una sociedad pequeña y cohesionada con una de las mayores libertades individuales del mundo: lidera rankings de igualdad de género, libertad de prensa y protección de datos. Es un país laico y progresista, con energía geotermal limpia, tradición de sagas y asambleas vecinales. Se sigue gobernando en parte con la costumbre nórdica de hablar y acordar hasta que hay consenso.',
    fit: [
      'Valoras por encima de todo la libertad de ser tú mismo sin pedir permiso.',
      'Creéis en la igualdad real entre personas, no solo ante la ley.',
      'Te sientes bien en una sociedad laica, abierta y conectada con la naturaleza.'
    ],
    friction: [
      'La vida en una comunidad pequeña y remota puede quedarse corta para tu ambición.',
      'El clima y la distancia respecto al resto del mundo son un hábito duro.'
    ]
  },
  {
    id: 'japon',
    name: 'Japón actual',
    place: 'Asia oriental',
    period: 'Actualidad',
    emoji: '\u{1F1EF}\u{1F1F5}',
    tagline: 'Orden, seguridad y tradición viva en pleno siglo XXI.',
    profile: { libertad: -1, tradicion: 5, comunidad: 6, apertura: -5, igualdad: -3, naturaleza: 4 },
    description: 'Japón mantiene una sociedad extraordinariamente segura y ordenada donde la tradición convive con la tecnología de vanguardia: se visita el santuario sintoísta el año nuevo y se paga con tarjeta en el metro. El trabajo en equipo, el respeto al grupo y el cuidado de las estaciones dan una cohesión social poco común. El precio es una presión social intensa, cierta homogeneidad y una jerarquía laboral todavía marcada.',
    fit: [
      'Te reconforta vivir en un lugar seguro, limpio y donde las cosas funcionan.',
      'Valoras la tradición viva y el respeto a los mayores y al grupo.',
      'Te sientes bien cuando el esfuerzo colectivo está por encima del protagonismo individual.'
    ],
    friction: [
      'La presión por encajar y la homogeneidad pesan sobre quien piensa distinto.',
      'La apertura al extranjero y la igualdad real avanzan despacio.'
    ]
  },
  {
    id: 'canada',
    name: 'Canadá',
    place: 'América del Norte',
    period: 'Actualidad',
    emoji: '\u{1F1E8}\u{1F1E6}',
    tagline: 'Multiculturalismo oficial, inmigración y civismo.',
    profile: { libertad: 6, tradicion: -3, comunidad: 5, apertura: 9, igualdad: 6, naturaleza: 5 },
    description: 'Canadá convirtió el multiculturalismo en política de Estado: recibe inmigración de todo el planeta y presume de convivencia entre comunidades sin exigir renuncias a la identidad de origen. Combina un estado de bienestar robusto con libertades civiles amplias, y su inmensidad natural —bosques, lagos, montañas— es parte central de su identidad. Es una sociedad de bajo conflicto, educada y con fuerte sentido cívico.',
    fit: [
      'Quieres vivir en un lugar donde caben todas las culturas y orígenes.',
      'Valoras la amabilidad, el respeto y las reglas del juego compartidas.',
      'Te atrae una sociedad con buenos servicios públicos y mucho espacio natural.'
    ],
    friction: [
      'El clima frío y la distancia respecto a Europa son un reto cotidiano.',
      'El consenso y la moderación pueden resultarte lentos o poco apasionados.'
    ]
  },
  {
    id: 'nzelanda',
    name: 'Nueva Zelanda',
    place: 'Oceanía',
    period: 'Actualidad',
    emoji: '\u{1F1F3}\u{1F1FF}',
    tagline: 'Biculturalismo maorí, igualdad y naturaleza protegida.',
    profile: { libertad: 6, tradicion: 2, comunidad: 5, apertura: 7, igualdad: 7, naturaleza: 9 },
    description: 'Nueva Zelanda ha construido su identidad sobre el encuentro entre la cultura maorí y la europea: el maorí es lengua oficial, y conceptos como el cuidado del entorno y la decisión comunitaria están en la política cotidiana. Es una sociedad igualitaria, relajada y muy abierta, con una naturaleza espectacular que protege con dureza legal: parques nacionales, energía renovable y objetivos ambientales ambiciosos.',
    fit: [
      'Te sientes bien en sociedades que respetan tanto la tradición indígena como la modernidad.',
      'La naturaleza no es un decorado para ti: quieres que esté protegida por ley.',
      'Valoras la igualdad, la cercanía y un ritmo de vida sin estrés.'
    ],
    friction: [
      'La lejanía del resto del mundo puede aislarte de lo que te interesa.',
      'El tamaño pequeño del país limita las oportunidades más ambiciosas.'
    ]
  },
  {
    id: 'eeuu',
    name: 'Estados Unidos',
    place: 'América del Norte',
    period: 'Actualidad',
    emoji: '\u{1F1FA}\u{1F1F8}',
    tagline: 'Individualismo, emprendimiento y libertad sin permiso.',
    profile: { libertad: 9, tradicion: 4, comunidad: -5, apertura: 5, igualdad: -5, naturaleza: -6 },
    description: 'Estados Unidos es la gran máquina de oportunidades: emprender, reinventarse, decir lo que se piensa y subir de nivel. La primera enmienda, la cultura de voluntariado religioso y el espíritu de frontera siguen definiendo el país de inmigrantes por excelencia. El otro lado: una desigualdad alta, poca red de protección social, competencia feroz y una relación con el territorio basada en el crecimiento y el dominio de la naturaleza.',
    fit: [
      'Eres emprendedor: quieres que te dejen intentarlo sin que nadie te frene.',
      'Valoras la libertad de expresión y la posibilidad de rehacer tu vida.',
      'Te motiva la competencia y medirte por tus resultados.'
    ],
    friction: [
      'La falta de red de protección te dejaría sin red si las cosas van mal.',
      'La desigualdad y la presión por rendir pueden ser agotadoras.'
    ]
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    place: 'Sudamérica',
    period: 'Actualidad',
    emoji: '\u{1F1FA}\u{1F1FE}',
    tagline: 'El país más laico y progresista de América.',
    profile: { libertad: 6, tradicion: -7, comunidad: 6, apertura: 5, igualdad: 7, naturaleza: 3 },
    description: 'Uruguay destaca por su secularismo (laicidad en el Estado desde hace un siglo), su estado de bienestar, su educación pública y una clase media amplia formada por oleadas de inmigración europea. Es un país pionero en derechos civiles —desde el voto femenino hasta la regulación del cannabis— con una vida tranquila, mate en mano, y una tradición de diálogo social entre sindicatos, gobierno y empresarios.',
    fit: [
      'Quieres un Estado laico donde las creencias de cada uno no impongan la ley.',
      'Valoras la igualdad, la educación pública y una vida tranquila, no de carreras.',
      'Te sientes bien en una sociedad abierta, habladora y sin fundamentalismos.'
    ],
    friction: [
      'El ritmo pausado y la escala del país pueden quedarse cortos para tu ambición.',
      'La estabilidad burocrática frena a quien quiere cambiar las cosas rápido.'
    ]
  }
];
