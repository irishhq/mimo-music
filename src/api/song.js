import jsonp from 'common/js/jsonp';
import { HOST } from './config'
import axios from 'axios'
// 获取歌曲的vkey
export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const data = Object.assign(
    {},
    {
      callback: 'musicJsonCallback',
      loginUin: 3051522991,
      format: 'jsonp',
      platform: 'yqq',
      needNewCode: 0,
      cid: 205361747,
      uin: 3051522991,
      guid: 5931742855,
      songmid: songmid,
      filename: `C400${songmid}.m4a`
    }
  );

  return jsonp(url, data);
}

export function getSong (id) {
  const url = HOST + `/song/url?id=${id}`

  return axios.get(url)
}