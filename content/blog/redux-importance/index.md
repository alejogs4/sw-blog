---
title: Why redux was / is still important
date: "2020-11-16T22:12:03.284Z"
description: "The tools we used shape how we think about code"
---

In the last few years with the release of React hooks, the React commununity has made a progresively migration to more built in state management tools, 
using normally useReducer and context, but once Flux arquitecture was popularized by its most popular implementation (Redux), the way we develop our applications changed (hopefully for good).

Let's begin with this Dijkstra's quote

> It is not only the violin that shapes the violinist, we are all shaped by
> the tools we train ourselves to use, and in this respect programming
> languages have a devious influence: they shape our thinking habits.

A person who has been building Java applications for a long time, could see a program as a composition of classes and packages, modeling the real world. This same idea applies to Redux too, Flux and Redux came up with new ways and ideas of how frontend applications should manage its state, state management where:

- Pure functions where mandatory (reducers)
- Perform state changes throught user events (actions)
- Reduce coupling between React components and state shape through selectors and action creators

These ideas despite being at the core of Redux philoshopy, can be applied at any application even if it's not using Redux, or even Javascript, and at any application can bring benefits and improvements in maintanibility

## Pure functions

Pure functions are functions which as long as they are called with the same parameters, returns the same value without affect any value outside the function's scope. This concept appears in Redux in the form of **reducers**.

```javascript
  function addNameProperty(object, name) {
    return {
      ...object,
      name
    }
  }

  addNameProperty({ age: 21 }, 'Alejandro'); // { age: 21, name: 'Alejandro' }
```

This function it's pure since meanwhile I pass the same parameters, this function will return the same, this is powerful for two reasons

### Easy to test
Since every call will produce the same result our test requires less setup to work properly and are more deterministic
```javascript
  test('Should add name property to passed object', () => {
    const expectedObject = {
      age: 20,
      name: 'Laura'
    };

    const actual = {
      age: 20
    };

    expect(addNameProperty(actual, 'Laura')).toEqual(expectedObject);
  });
```

The below test will always run as a succesful one, and being aware of this bring us the next advantage

### Reduce cognitive load and complexity

How much you need to dig into your code to see how it works? take a look at this

```javascript
  const object = { id: 1 };

  doStuff(object);
  doStuff(object);
  doStuff(object);
  doStuff(object);
  doStuff(object);
  doStuff(object);
  doStuff(object);

  console.log(object);
```

If I tell you that doStuff is not pure and neither executing the code nor looking at doStuff implementation, could you be sure that `object` is still the same?. No, you couldn't and this need of run the code or review doStuff adds cognitive load and complexity since your application it's harder to reason about.

But what happen if unlike to previous case, I tell you that doStuff functions it's pure? you can be sure that `object` is `{id: 1}` this is a simple but powerful idea, and it's the main reason why Redux and React help us to get deterministic renders, given that threat UI as a pure function of application state.

### State changes as user events

In our application given our businesses our users will perform some actions over our applications, these actions suddenly will be reflected on the screen, these two concepts (action - consequence) are everywhere in software development
- user buy  -> email sending
- match score -> mobile notification

How handle this an interesting topic in software engineering, usually a way to handle it it's perform the business operation and dispatch an event with the data of the operation just performed this event will be listened by a **n** number of handlers, where those are, or what they do it's not the business of the calling place, this is powerful since reduce **coupling** between calling place and event handlers.

**Note: ** We will talk about coupling in a moment

```javascript
// Component.jsx -> calling place
dispatch({
  type: 'NEW_USER',
  payload: {
    name: 'Miguel',
    age: 21
  }
});

// Reducer
function reducer(state = [], action) {
  switch(action.type) {
    case 'NEW_USER': // Event handler
      return [...state, action.payload];
    // More code...
  }
}
```

There are a plenty number of libraries in Javascript ecosystem which help us to implement this patterns, but the most popular ones are RxJS and built in node event emitter.

### Reduce coupling hidding information using selectors and action creators

The main measure of a good abstraction it's how effectively hides information from us, the better this is accomplished the better we can focus in a single task at the time, besides hide information properly reduce coupling between abstraction and the place where it's used reducing also the places where changes will be made and how wide the impact of these changes will be.

Selectors and action creators help us to get the above goal, hidding the state shape and events nature.

### Selectors

Selectors in Redux are simply functions which receives the state and returns a subset of the state.

```javascript
// Selector
const getReleasedProjects = state => state.projects.filter(project => project.released)

function ProjectList() {
  // app state
  const releasedProjects = useSelector(getReleasedProjects) // released projects

  // JSX
}
```

Imagine that you have to use this information several times through your application and saddly you are not using selectors, if in a refactor state shape change to something like this `state.assignments`, you would have to change it in every single place, breaking your application because your components were too aware of how state looks like, with selectors, state shape is information which it's hidden behind these selectors, making selectors a single place of change if state shape change, making your application more resilient, easier to maintain, refactor and extend.

### Action creators

Action creators