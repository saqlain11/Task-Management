# Task Management System

Streamframe is a task management system that focuses on
tracking the progress of employees for their assigned tasks. A task’s status can be one of the
following: `IN PROGRESS`,`DONE`, or `COMPLETE`. A task can be nested within another task
(hereinafter referred to as **parent task**), becoming a dependency of that parent task. Any
individual task may have any number of dependencies but should never result in a circular
dependency.

## Features

- Create Task
- View Tasks & SubTask
- Filter Task (on status)
- Update Task

## Folder Structure

```.
├── __fixtures__
├── components
│   ├── organisms
│   │   ├── index.ts
│   │   ├── SubTaskList.tsx
│   │   ├── TaskField.tsx
│   │   ├── TaskHeader.tsx
│   │   └── TaskList.tsx
│   └── index.ts
├── helpers
│   ├── constants
│   │   ├── api-messages.ts
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── ui-text.ts
│   │   └── ui-validation.ts
│   └── utils
│       ├── calculateDependencies.ts
│       ├── fetcher.ts
│       ├── getSubTask.ts
│       ├── getTask.ts
│       ├── getTaskIndex.ts
│       ├── index.ts
│       └── toast.ts
├── hooks
│   ├── index.ts
│   ├── useAppDispatch.ts
│   ├── useAppSelector.ts
│   └── useDependencies.ts
├── middlewares
│   ├── ErrorBoundary.tsx
│   └── index.ts
├── model
│   ├── index.ts
│   └── Task.ts
├── state-management
│   ├── actions
│   │   ├── index.ts
│   │   └── TaskAction.ts
│   ├── reducer
│   │   ├── index.ts
│   │   └── taskReducer.ts
│   ├── store
│   │   └── index.ts
│   └── index.ts
├── templates
│   ├── AllTask.tsx
│   ├── CreateTask.tsx
│   ├── NotFound.tsx
│   └── UpdateTask.tsx
├── theme
│   ├── color.tsx
│   └── index.tsx
├── App.css
├── App.test.js
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── reportWebVitals.tsx
└── setupTests.js
```

## Installation

Install Task-Management with npm

```bash
  nvm use (to set version, avoid from incompatibility of peer dependencies)
  npm install
```

## Format & liniting of code

To start the project,run the following command

```bash
  npm run format (this command will prettify you code)
  npm run lint (this will find lint error in your code)
```

## Start project

To start the project,run the following command

```bash
  npm start
```

This command will up client and server concurrently.
run server on `localhost:1996` & run client on `localhost:3000`.

## API Reference

#### Task Schema

| Parameter     | Type       | Description                    |
| :------------ | :--------- | :----------------------------- |
| `id`          | `int`      | **Required**. Task id          |
| `taskName`    | `string`   | **Required**. Task Name        |
| `description` | `string`   | **Required**. Task Description |
| `status`      | `string`   | **Required**. Task Status      |
| `subTask`     | `number[]` | **Optional**. subtask          |

#### Get Tasks

```http
  GET /task
```

To get all task.

#### Get Task by pages

```http
  GET /task/?_page=${page}&_limit=${limit}
```

To get task by pagination.

#### Create Task

```http
  POST /task
```

| Parameter     | Type       | Description                    |
| :------------ | :--------- | :----------------------------- |
| `id`          | `int`      | **Required**. Task id          |
| `taskName`    | `string`   | **Required**. Task Name        |
| `description` | `string`   | **Required**. Task Description |
| `status`      | `string`   | **Required**. Task Status      |
| `subTask`     | `number[]` | **Optional**. subtask          |

To create a task.

#### Update Task

```http
  PUT /task/${id}
```

| Parameter     | Type       | Description                           |
| :------------ | :--------- | :------------------------------------ |
| `task_name`   | `string`   | **Required**. name for task identify  |
| `status`      | `string`   | **Required**. for task status         |
| `description` | `string`   | **Required**. for understand the task |
| `subTask`     | `number[]` | **Optional**. subtask                 |

To update a task.

## Tech Stack

**Client:** `React`, `Redux`, `Thunk`, `Antd UI`, `Jest with RTL` (not implemented but have on field knowledge )

**Server:** `Json-Server`

## Authors

- [@saqlain](https://www.github.com/saqlain11)
