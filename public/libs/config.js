window.htconfig = {
  Default: {
    toolTipDelay: 100,
    toolTipContinual: true,
    debugTipBackground: 'rgba(61,61,61,0.6)',
    debugTipLabelColor: '#fff',
    convertURL: (url) => {
      let storagePrefix = '';

      // 测试/正式环境
      // if (window.location.pathname.indexOf("mtip-factory") === -1) {
      //   storagePrefix = `${window.location.pathname}mtip-factory/storage`;
      // } else {
      //   storagePrefix = `${window.location.pathname}storage`;
      // }
      storagePrefix = `${
        window.__MAIN_APP_NAME__
          ? __MAIN_APP_NAME__ + '/'
          : window.location.pathname
      }storage`; // 开发环境
      if (
        storagePrefix &&
        url &&
        !/^data:image/.test(url) &&
        !/^http/.test(url) &&
        !/^https/.test(url)
      ) {
        if (url.indexOf('jsons/') !== 0) {
          url = `${storagePrefix}/${url}`;
        }
      }
      // append timestamp
      url += `${url.indexOf('?') >= 0 ? '&' : '?'}ts=${Date.now()}`;
      // append sid
      const match = window.location.href.match('sid=([0-9a-z-]*)');
      if (match) {
        // eslint-disable-next-line prefer-destructuring
        window.sid = match[1];
      }
      if (window.sid) {
        url += `&sid=${window.sid}`;
      }
      return url;
    },
  },
};
