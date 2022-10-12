import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { updateTodos } from '../../bussinessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
//nothing
export const handler: APIGatewayProxyHandler = 
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodos: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    
    const update = await updateTodos(updatedTodos, todoId, jwtToken)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
        "item": update
    }),
    }
};
