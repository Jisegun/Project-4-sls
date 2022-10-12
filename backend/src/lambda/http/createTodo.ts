import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodos } from '../../bussinessLogic/todos'


//const logger = createLogger('TodosAccess')

export const handler: APIGatewayProxyHandler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    
    // TODO: Implement creating a new TODO item

   const todoItem = await createTodos(newTodo, jwtToken);

   return {
       statusCode: 201,
       headers: {
           "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify({
           "item": todoItem
       }),
   };

};
