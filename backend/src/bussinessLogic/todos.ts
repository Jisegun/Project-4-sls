import { TodosAccess } from '../dataLayer/todosAccess';
import { TodoItem } from '../models/Todoitem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { parseUserId } from '../auth/utils';
import { TodoUpdate } from '../models/TodoUpdate';

// TODO: Implement businessLogic
const uuidv4 = require('uuid/v4'); 
const todosAccess = new TodosAccess()

export async function getAlltodos(jwtToken:string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken);
  return await todosAccess.getAlltodos(userId);
}

export function createTodos(
  createTodosRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const userId = parseUserId(jwtToken);
  const todoId = uuidv4();
  const s3BucketName = process.env.TODOS_S3_BUCKET;

  return todosAccess.createTodos({
    createdAt: new Date().getTime().toString(),
    todoId: todoId,
    userId: userId,
    attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
    done: false,
    ...createTodosRequest,
  });
}
export async function updateTodos (updatedTodo: UpdateTodoRequest, jwtToken: string, todoId: string): Promise<TodoUpdate> {
  const userId = parseUserId(jwtToken);
  return todosAccess.updateTodos(userId, todoId, updatedTodo);
}
export async function deleteTodos(jwtToken: string, todoId: String): Promise<string> {
const userId = parseUserId(jwtToken)
return todosAccess.deleteTodos(userId, todoId)
}

export async function generateUploadUrl(todoId: string): Promise<string> {
return todosAccess.generateUploadUrl(todoId);
}