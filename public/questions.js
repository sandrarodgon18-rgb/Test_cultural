// 12 preguntas. Cada opción puntúa en 1 o 2 ejes (rango orientativo: -4..+4).
const QUESTIONS = [
  {
    id: 1,
    theme: 'Autoridad',
    title: 'Vigilancia en nombre de la seguridad',
    text: 'Se descubre que el gobierno vigila las comunicaciones de los ciudadanos para prevenir el crimen. ¿Qué te parece?',
    options: [
      { label: 'Es aceptable: la seguridad de todos vale más que la privacidad de algunos.', score: { libertad: -4 } },
      { label: 'Solo con autorización judicial y límites estrictos.', score: { libertad: 1 } },
      { label: 'Que lo hagan las comunidades vecinales, no un centro de poder.', score: { libertad: 2, comunidad: 2 } },
      { label: 'Mejor prevenir con más policía que vigilar a todos.', score: { libertad: -1, comunidad: 1 } },
      { label: 'Nunca: prefiero correr riesgos antes que vivir vigilado.', score: { libertad: 4 } }
    ]
  },
  {
    id: 2,
    theme: 'Tradición',
    title: 'Costumbre contra evidencia',
    text: 'Una tradición muy arraigada en tu pueblo contradice lo que dice hoy la ciencia. ¿Qué haces?',
    options: [
      { label: 'La tradición se respeta siempre: es lo que nos da identidad.', score: { tradicion: 4 } },
      { label: 'Se mantiene el ritual por respeto, pero se explica lo que dice la ciencia.', score: { tradicion: 2 } },
      { label: 'Que decida cada familia libremente, sin imponer nada.', score: { libertad: 3 } },
      { label: 'La ciencia manda: la tradición se corrige o se deja atrás.', score: { tradicion: -4, libertad: 1 } },
      { label: 'Se debate en la comunidad y se reforma lo que haga falta.', score: { comunidad: 3, tradicion: -1 } }
    ]
  },
  {
    id: 3,
    theme: 'Economía',
    title: 'Dos vecinos, dos sueldos',
    text: 'Uno trabaja 80 horas a la semana y gana mucho; otro trabaja 40 y gana poco. ¿Qué te parece justo?',
    options: [
      { label: 'Es justo: cada uno recoge lo que siembra.', score: { comunidad: -4, igualdad: -3 } },
      { label: 'Es su derecho, pero con impuestos se garantizan sanidad y educación a todos.', score: { comunidad: 2, igualdad: 2 } },
      { label: 'Deberían cobrar casi lo mismo: la gran desigualdad corrompe a la sociedad.', score: { igualdad: 4, comunidad: 3 } },
      { label: 'Lo importante es que nadie pase hambre ni se quede sin techo; el resto da igual.', score: { igualdad: 3, comunidad: 4 } },
      { label: 'El Estado debe poner un techo a los salarios más altos.', score: { igualdad: 4, libertad: -3 } }
    ]
  },
  {
    id: 4,
    theme: 'Naturaleza',
    title: 'La mina y el bosque',
    text: 'Se abre una mina que dará 1000 puestos de trabajo, pero destruirá un bosque con valor ecológico y simbólico. ¿Qué decides?',
    options: [
      { label: 'El empleo primero: el bosque se repuebla más adelante.', score: { naturaleza: -4, comunidad: -1 } },
      { label: 'Que se explote, pero con compensación ambiental exigente.', score: { naturaleza: -1, libertad: 1 } },
      { label: 'Que lo decidan los vecinos en un referéndum local.', score: { libertad: 2, comunidad: 2, naturaleza: 1 } },
      { label: 'El bosque no se toca: hay otras formas de crear empleo.', score: { naturaleza: 4 } },
      { label: 'Máxima protección legal a la naturaleza, aunque cueste puestos de trabajo.', score: { naturaleza: 4, igualdad: 1 } }
    ]
  },
  {
    id: 5,
    theme: 'Apertura',
    title: 'Llegan familias refugiadas',
    text: 'Tu ciudad acoge a 500 familias refugiadas de guerra. ¿Cuál es tu postura?',
    options: [
      { label: 'Bienvenidas: enriquecen la ciudad y hacen falta.', score: { apertura: 4, comunidad: 1 } },
      { label: 'Sí, siempre que haya planes serios de integración y aprendizaje del idioma.', score: { apertura: 2, comunidad: 2 } },
      { label: 'Solo si no saturan la vivienda y la sanidad de los vecinos.', score: { apertura: -1, comunidad: 2 } },
      { label: 'Mejor ayudar en sus países: hay que proteger nuestra identidad.', score: { apertura: -4, tradicion: 2 } },
      { label: 'Que decida el municipio de destino, no el gobierno central.', score: { libertad: 3, apertura: 1 } }
    ]
  },
  {
    id: 6,
    theme: 'Religión',
    title: 'La fe y el poder',
    text: '¿Qué papel debe tener la religión en la vida pública?',
    options: [
      { label: 'Debe orientar las leyes y las costumbres de la sociedad.', score: { tradicion: 5, libertad: -3 } },
      { label: 'Presencia simbólica en los actos oficiales, sin poder sobre la ley.', score: { tradicion: 2 } },
      { label: 'Respeto a todas las creencias, con el Estado manteniéndose al margen.', score: { tradicion: -1, apertura: 3 } },
      { label: 'Ningún papel: la religión es asunto estrictamente privado.', score: { tradicion: -4, libertad: 2 } },
      { label: 'La sociedad debe decidir con la razón y la evidencia, no con la fe.', score: { tradicion: -5, libertad: 1 } }
    ]
  },
  {
    id: 7,
    theme: 'Comunidad',
    title: 'Ayudar en el barrio',
    text: 'Tu barrio organiza un banco de alimentos y una fiesta vecinal. ¿Cuál es tu actitud?',
    options: [
      { label: 'Ayudo si me viene bien, pero nadie debe obligarme.', score: { libertad: 3, comunidad: -3 } },
      { label: 'Ayudar al vecino es un deber de quien vive aquí.', score: { comunidad: 4 } },
      { label: 'Se organiza por turnos y todos aportan lo mismo.', score: { comunidad: 4, igualdad: 3 } },
      { label: 'Lo debe financiar el ayuntamiento; la solidaridad se organiza mejor con dinero público.', score: { comunidad: 3, igualdad: 3, libertad: -1 } },
      { label: 'Que lo monte quien tenga tiempo; el resto aporta dinero.', score: { comunidad: 1, libertad: 1 } }
    ]
  },
  {
    id: 8,
    theme: 'Orden',
    title: 'La delincuencia sube',
    text: 'En tu ciudad suben los robos y la sensación de inseguridad. ¿Por dónde se empieza?',
    options: [
      { label: 'Más policía en la calle y penas más duras.', score: { libertad: -4, igualdad: -1 } },
      { label: 'Invertir en educación y empleo en los barrios conflictivos.', score: { comunidad: 3, igualdad: 3, libertad: 1 } },
      { label: 'Vigilancia vecinal y mediación entre bandas.', score: { comunidad: 4, libertad: 1 } },
      { label: 'Cada cual se defienda como pueda: la responsabilidad es individual.', score: { libertad: 4, comunidad: -4 } },
      { label: 'Más control en las fronteras y en los barrios problemáticos.', score: { libertad: -3, apertura: -3 } }
    ]
  },
  {
    id: 9,
    theme: 'Trabajo',
    title: 'El ritmo de vida',
    text: '¿Qué modelo de vida laboral te gustaría vivir?',
    options: [
      { label: 'Jornadas exigentes: el éxito personal exige esfuerzo y horas.', score: { comunidad: -4, naturaleza: -2 } },
      { label: 'Jornadas cortas y mucho tiempo libre para la familia y uno mismo.', score: { libertad: 3, naturaleza: 3, comunidad: 1 } },
      { label: 'Estabilidad y empleo para todos, aunque se gane algo menos.', score: { igualdad: 3, comunidad: 4, libertad: -1 } },
      { label: 'Empresas donde el equipo sea como una familia.', score: { comunidad: 4, tradicion: 1 } },
      { label: 'Trabajo a distancia y autonomía total sobre mi horario.', score: { libertad: 4, comunidad: -3 } }
    ]
  },
  {
    id: 10,
    theme: 'Igualdad',
    title: 'Igualdad en el trabajo',
    text: 'Las mujeres cobran de media menos que los hombres por los mismos puestos. ¿Solución?',
    options: [
      { label: 'Igualdad de sueldo por puesto, verificada por inspección.', score: { igualdad: 4, libertad: -1 } },
      { label: 'Cuotas obligatorias en los consejos de administración hasta lograrlo.', score: { igualdad: 4, libertad: -3 } },
      { label: 'Que ascienda quien rinda mejor: sin cuotas ni privilegios.', score: { igualdad: -3, comunidad: -3 } },
      { label: 'Que lo vayan resolviendo las empresas y las familias, sin leyes.', score: { igualdad: -2, libertad: 3 } },
      { label: 'Igualdad real: sueldo igual, reparto de los cuidados y horarios compatibles.', score: { igualdad: 4, comunidad: 3 } }
    ]
  },
  {
    id: 11,
    theme: 'Educación',
    title: 'Para qué sirve la escuela',
    text: '¿Cuál debe ser la misión principal de la escuela?',
    options: [
      { label: 'Formar ciudadanos patriotas que respeten la autoridad.', score: { tradicion: 4, libertad: -3, apertura: -1 } },
      { label: 'Enseñar a pensar críticamente, aunque incomode al poder.', score: { libertad: 4, tradicion: -3 } },
      { label: 'Transmitir la cultura local, la lengua y sus tradiciones.', score: { tradicion: 4, apertura: -2 } },
      { label: 'Dar herramientas prácticas para encontrar buen trabajo.', score: { comunidad: -3, naturaleza: -2 } },
      { label: 'Formar para el bien común y la cooperación entre iguales.', score: { comunidad: 4, igualdad: 3 } }
    ]
  },
  {
    id: 12,
    theme: 'Prioridades',
    title: 'Una sola prioridad',
    text: 'Si pudieras elegir UNA prioridad para el país donde vives, ¿cuál sería?',
    options: [
      { label: 'Orden, seguridad y respeto a la autoridad.', score: { libertad: -4, tradicion: 3 } },
      { label: 'Más libertad individual y menos regulación.', score: { libertad: 4, comunidad: -3 } },
      { label: 'Igualdad de rentas y servicios públicos fuertes.', score: { igualdad: 4, comunidad: 4 } },
      { label: 'Proteger la naturaleza y el modo de vida local.', score: { naturaleza: 4, apertura: -3 } },
      { label: 'Apertura al mundo: inmigración y cooperación internacional.', score: { apertura: 4, libertad: 2 } }
    ]
  }
];
