import React from 'react'

const Header = ({ name }) =>
{
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) =>
{
  const total = parts.reduce((x,y) => x + y.exercises, 0)

  return (
    <>
      <b>total of {total} exercises</b>
    </>
  ) 
}

const Part = ({ name, exercises }) =>
{
  return (
    <>
      {name} {exercises}
    </>
  )
}

const Content = ({ parts }) =>
{
  return (
    <>
      {parts.map(part =>
        <p key={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </p>
      )}
    </>
  )
}

const Course = ({ course }) =>
{
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} /> 
    </div>
  )
}

export default Course