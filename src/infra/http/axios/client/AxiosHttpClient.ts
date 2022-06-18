import axios, { AxiosResponse } from 'axios'
import {
    HttpPostParams,
    HttpResponse,
    IHttpPostClient,
} from '@/data/protocols/http'

// This is a known design pattern named "Adapter". In this implementation, the "Adapter" enforce Axios external library to behave as defined in the "Data" layer.
export class AxiosHttpClient implements IHttpPostClient<any, any> {
    async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
        let httpResponse: AxiosResponse<any>
        try {
            httpResponse = await axios.post(params.url, params.body)
        } catch (err) {
            httpResponse = err.response
        }

        return {
            statusCode: httpResponse.status,
            body: httpResponse.data,
        }
    }
}
