---
title: Why redux was / is still important
date: "2020-11-16T22:12:03.284Z"
description: "The tools we used shape how we think about code"
---

In the last few years with the release of React hooks, the React commununity has made a progresively migration to more built in state management tools, 
using normally useReducer and context, but once Flux arquitecture was popularized by its most popular implementation (Redux), the way we develop our applications changed (hopefully for good).

Let's begin with this Djisktra's quote

> It is not only the violin that shapes the violinist, we are all shaped by
> the tools we train ourselves to use, and in this respect programming
> languages have a devious influence: they shape our thinking habits.

A person who has been building Java applications for a long time, could see a program as a composition of classes and packages, modeling the real world. This same idea applies to Redux too, Flux and Redux came up with new ways and ideas of how frontend applications should manage its state, state management where:

- Pure functions where mandatory (reducers)
- State predictability leads to predictability ui changes
- Perform state changes throught user actions (events)
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

But what happen if unlike to previous case, I tell you that doStuff functions it's pure? you can be sure that `object` is `{id: 1}` this is a simple but powerful idea, and it's the main reason why Redux help us to get deterministic renders.