import axios from 'axios';
import { ENV } from './../env';

export class HttpService {
	public checkInputFolder() {
		return axios.post(ENV.BASE_URL.NODE + "settings/checkInputFolder");
	}
}