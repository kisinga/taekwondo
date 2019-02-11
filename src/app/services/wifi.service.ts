import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class WifiService {
  linuxcommand = 'sudo nmcli device wifi hotspot con-name my-hotspot ssid my-hotspot band bg password jesuisunmotdepasse';
  islinux = true;

  constructor(private _electronService: ElectronService) {
  }

  /**
   * @param name
   * @param password
   * @returns {promise}
   */

  setWifi(name, password) {
    if (!name || !password) {
      return;
    }
    const $bash = this.islinux ? this.linuxcommand : `netsh wlan set hostednetwork mode=allow ssid=${name} key=${password}`;
    return this.execute($bash).addListener('message', message => {
      console.log(message);
    });
  }

  /**
   *
   */
  startWifi() {
    const $bash = `netsh wlan start hostednetwork`;
    return this.execute($bash);
  }

  /**
   *
   */
  stopWifi() {
    const $bash = `netsh wlan stop hostednetwork`;
    return this.execute($bash);
  }

  execute(command, options = {}) {
    options['async'] = true;

    return this._electronService.childProcess.exec(command, options);
  }
}
