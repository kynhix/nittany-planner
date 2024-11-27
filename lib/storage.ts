import { TaskList } from "./core"

const LOCALSTORAGE_STR = 'nittany-planner'

export function save(items: TaskList[]) {
  localStorage.setItem(LOCALSTORAGE_STR, JSON.stringify(items))
}

export function load(): TaskList[] {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_STR) ?? '[]')
}
