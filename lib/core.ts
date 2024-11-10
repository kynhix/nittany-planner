export type List = {
  title: string;
  categoires: Array<Category>;
}

export type Category = {
  title: string;
  tasks: Array<Task>;
}

export type Task = {
  title: string;
}
