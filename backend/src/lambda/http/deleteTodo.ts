import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodos } from '../../helpers/todos'

export const handler: APIGatewayProxyHandler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    // TODO: Remove a TODO item by id  
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1]
    const removeData = await deleteTodos(jwtToken, todoId);

    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
      },
      body: removeData,
  };

};
