---
title: Por qué redux es todavia importante
permalink: '/redux-importance'
date: '2020-11-23T22:12:03.284Z'
description: 'Nuestras herramientras influencian la forma en que pensamos'
published: true
langKey: es
---

En los ultimos años con el lanzamiento de los React hooks, la comunidad de React ha progresivamente migrado a soluciones de manejo de estado propias de la libreria, usualmente usando `useReducer` y context, sin embargo una vez la arquitectura Flux fue popularizada por su implementaciòn màs popular (Redux), la forma en que desarrollamos nuestras aplicaciones cambio (espero que para bien).

Comencemos con esta frase de Dijkstra

> Es no solo el violin quien hace al violinista, todos nosotros somos influenciados por
> las herramientas que usamos, y de igual forma los lenguajes de 
> programación tienen una gran influencia sobre nuestros habitos de pensamiento.

Un desarrollador que ha estado construyendo aplicacions con Java por un tiempo puede que vea una aplicación como la composición de clases y paquetes, modelando asi el mundo real. Esta misma idea aplica para Redux, Flux y Redux llegaron con nuevas ideas de como las aplicaciones frontend deberian manejar su estado, un manejo de estado donde:

- Las funciones puras son obligatorias (reducers)
- Realizar el cambio de estado por medio de eventos del usuario (acciones)
- Reducir el acomplamiento entre nuestros componentes y la forma del estado por medio de selectores y action creators.

Estas ideas apesar de ser parte de la filosofía de Redux, puede ser aplicada en cualquier aplicación incluso si esta no esta usando Redux e incluso si no esta usando Javascript, cualquier aplicación puede beneficiarse de estos conceptos.

## Funciones puras

Las funciones puras son funciones que mientras sean llamadas con los mismos parametros retornaran el mismo valor sin afectar los valores que estan afuera del scope o alcance de la función. Este concepto aparece en Redux en la forma de **reducers**.


```javascript
function addNameProperty(object, name) {
  return {
    ...object,
    name,
  }
}

addNameProperty({ age: 21 }, 'Alejandro') // { age: 21, name: 'Alejandro' }
```
Esta función es pura por que mientras reciba los mismos parametros, esta función retornara el mismo valor, ademas no estamos afectando el objeto pasado por parametro, aplicando **immutability**, el objeto no es cambiado, en base a el creamos un nuevo valor, esto es muy poderoso por dos razones.

### Facíl de probar

Dado que cada llamada produce el mismo resultado, nuestras pruebas necesitan de menos configuración para funcionar de manera adecuada y estas pruebas son mas deterministicas.

```javascript
test('Should add name property to passed object', () => {
  const expectedObject = {
    age: 20,
    name: 'Laura',
  }

  const actual = {
    age: 20,
  }

  expect(addNameProperty(actual, 'Laura')).toEqual(expectedObject)
})
```

El test anterior siempre correra exitosamente, y ser consciente de esto nos trae la siguiente ventaja.

### Reduce la carga cognitiva y complejidad.

¿Cuando necesitas revisar tu código para ver  como funciona?


```javascript
const object = { id: 1 }

doStuff(object)
doStuff(object)
doStuff(object)
doStuff(object)
doStuff(object)
doStuff(object)
doStuff(object)

console.log(object)
```

Si te digo que `doStuff()` no es pura y sin ejecutar el código ni revisando la implementación `doStuff()`, podrias estar seguro que `object` sigue siendo el mismo? la respuesta es que no puedes estar seguro, y esta inseguridad, la necesidad de correr el código o de revisar cada detalle agrega carga cognitiva y complejidad ya que tu aplicación se vuelve más dificil de razonar ya que tienes que prestar atención a más detalles al mismo tiempo que los que supone.

Pero que pasa si a diferencia del caso anterior te digo que `doStuff()` es pura? puedes estar seguor que `object` es `{id: 1}`, esto es simple pero poderoso, y es la principal razón del por que Redux y React nos ayudan a conseguir renderizados deterministicos, ya que trata nuestra interfaz de usuario como **el resultado de una función pura del estado de la aplicación**.

### Cambios de estado como eventos del usuario

Dado nuestros negocios los usuarios realizaran ciertas acciones sobre nuestras aplicaciones, estas acciones eventualmente se veran reflejadas sobre la pantalla, estos dos conceptos (acción - consecuencia) estan en todas partes en el desarrollo de software.

- Compra del usuario -> Envio de email
- Nuevo puntaje -> Notificación movil

Como manejar esta información es un tema muy interesante en ingenieria de software, usualmente se maneja esto realizando la operación de negocio y despachando eventos con la información de la operación recien realizada, este evento o cambio de información sera escuchado por un **n** numero de manejadores. Donde estos manejadores estan o que hacen esta fuera del conocimiento del lugar de llamada, esto es importante por que reduce el **acoplamiento** entre el lugar de llamada y los manejadores de eventos.

```javascript
// Component.jsx -> calling place
dispatch({
  type: 'NEW_USER',
  payload: {
    name: 'Miguel',
    age: 21,
  },
})

// Reducer
function reducer(state = [], action) {
  switch (action.type) {
    case 'NEW_USER': // Event handler
      return [...state, action.payload]
    // More code...
  }
}
```

Hay varias librerias en el ecosistema de Javascript que nos ayuda a implementar estos patrones, pero las más populares son RxJS y el event emitter de Nodejs

Redux en si mismo no es una libreria para basarse en eventos pero conceptualmente puede manejarse de una forma similar, dado que puede ser visto como una implementación del [patron observer](https://refactoring.guru/design-patterns/observer) since it can be seen as an implementation of the [obsever pattern](https://refactoring.guru/design-patterns/observer) donde un **n** numero de objetos (componentes) están conectados al estado escuchando los cambios que este tenga, tomando al estado de Redux como una unica fuente de verdad.

### Reduce acoplamiento ocultando información usando selectores y action creators

La principal medida de una buena abstracción es que tan efectivamente nos oculta información, mientras mejor esto sea conseguido mejor nos podemos enfocar en una sola tarea al mismo tiempo, además ocultar información de una forma adecuada, reduce acoplamiento entre la abstracción y el lugar donde esta es usada, reduce tambien los lugares donde los cambios se hacen y que tan grande sera el impacto de estos cambios.

Selectores y action creators nos ayudan a conseguir el objetivo anterior ocultando la forma del estado y la naturaleza de los eventos.

### Selectores

Selectores en Redux son simplemente funciones que reciben el estado y retornan una porción de ese estado.

```javascript
// Selector
const getReleasedProjects = state =>
  state.projects.filter(project => project.released)

function ProjectList() {
  // app state
  const releasedProjects = useSelector(getReleasedProjects) // released projects

  // JSX
}
```

Imagina que tienes que usar esta información en distintos sitios a lo largo de tu aplicación y tristemente no estas usando selectores, si un refactor cambia la forma del estado a algo como `state.assignments`, tendrias que cambiarlo en cada uno de esos lugares, rompiendo tu aplicación por que los componentes sabián demasiado de como lucía el estado, en cambio con selectores, la forma del estado es una información que esta oculta detrás de estos selectores, haciendo selectores un unico lugar de cambio si la forma del estado cambia, haciendo tu aplicación más resiliente, facíl de mantener, refactorizar y extender.

### Action creators

Action creators fueron vendidos como una forma de evitar errores cuando queremos cambiar nuestro estado, sin embargo creo ese argumento puede ser desarrollado un poco más, piensa en tus componentes y cuanto ellos saben acerca de tu estado, con el mismo argumento que usamos para decir que los selectores son importantes, podemos decir lo mismo acerca de los action creators. Los action creators **ocultan** información, ocultan como nuestro estado sera cambiado como cual es toda la información necesaria para exitosamente realizar esta actualización, este ocultamiento de información nos ayuda a pensar acerca de la información a cambiar en lugar de la naturaleza del cambio, haciendo que la carga cognitiva sea más facil de manejar y en el largo plazo haciendo estas operaciones más faciles de mantener.

```javascript
function ProjectList() {
  // app state
  const dispatch = useDispatch()

  function handleNewMessage() {
    const messageInformation = {
      // data ...
    }

    dispatch(addNewMessage(messageInformation))
  }
  // JSX
}
```

Aqui no estamos pensando acerca de ni de que tipo de cambio estamos realizando, ni que información extra necesitamos calcular, simplemente estamos enviando el nuevo mensaje, lo cual es el unico detalle que nos concierne.

Tanto los selectores como los action creators pueden ser llevados a otros lenguajes cuando hablamos de metodos de acceso y metodos para la transformación de datos, en el mundo de [ADT](https://en.wikipedia.org/wiki/Abstract_data_type#:~:text=In%20computer%20science%2C%20an%20abstract,the%20behavior%20of%20these%20operations.) nosotros modelamos el acceso a estructura de datos y los cambios sobre esas estructuras de una forma abstracta, conseguimos esa información, ¿como es conseguida? realmente no importa, el lugar donde esta abstracción es usada no le importa este detalle, y lo mismo aplica para los metodos que nos ayudan a cambiar información.


## Conclusiones

Yo se que estos conceptos pueden ser aprendidos con otras librerias o lenguajes pero ese es exactamente el punto, Redux trajo estos conceptos y nos puso a pensar sobre ellos en nuestras aplicaciones frontend, e incluso si ahora mismo no usas Redux en tus proyectos asi como yo, puedes todavia usarlos con todos los beneficios que te dan.

Espero que lo disfrutado y cualquier duda o mejora dejame saber.