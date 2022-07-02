import { sum } from './js/sum.js';
import './css/index.css';
import './css/iconfont.css';
import './less/index.less';
import './sass/index.scss';
import './stylus/index.styl';

const result = sum(1, 2);
console.log(result);

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  import(/* webpackChunkName: 'sub' */ './js/sub.js').then(({ sub }) => {
    console.log(sub(2, 1));
  });
});

const promise = Promise.resolve();
promise.then(() => {
  console.log('promise!');
});

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./js/sum.js', function ({ sum }) {
    const result1 = sum(1, 2);
    console.log(result1);
  });
}
