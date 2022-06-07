import axios from 'axios'
import {
    HttpPostParams,
    HttpResponse,
    IHttpPostClient,
} from '@/data/protocols/http'

// This is a known design pattern named "Adapter". In this implementation, the "Adapter" enforce Axios external library to behave as defined in the "Data" layer.
export class AxiosHttpClient implements IHttpPostClient<any, any> {
    async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
        const httpResponse = await axios.post(params.url, params.body)

        return {
            statusCode: httpResponse.status,
            body: httpResponse.data,
        }
    }
}
