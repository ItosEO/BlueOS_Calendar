/**
 * 公历转农历工具函数
 */

// 农历1900-2100的润大小信息
const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
  ];
  
  // 阳历节日
  const solarFestival = {
    '0101': '元旦',
    '0214': '情人节',
    '0308': '妇女节',
    '0312': '植树节',
    '0401': '愚人节',
    '0501': '劳动节',
    '0504': '青年节',
    '0601': '儿童节',
    '0701': '建党节',
    '0801': '建军节',
    '0910': '教师节',
    '1001': '国庆节',
    '1225': '圣诞节'
  };
  
  // 农历节日
  const lunarFestival = {
    '0101': '春节',
    '0115': '元宵节',
    '0505': '端午节',
    '0707': '七夕',
    '0815': '中秋节',
    '0909': '重阳节',
    '1208': '腊八节',
    '1224': '小年',
    '0100': '除夕'
  };
  
  // 中文数字
  const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  // 月份
  const nStr2 = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  // 日期
  const nStr3 = ['初', '十', '廿', '卅'];
  
  /**
   * 返回农历y年闰哪个月 1-12，没闰返回0
   * @param {number} year 农历年
   */
  function leapMonth(year) {
    return lunarInfo[year - 1900] & 0xf;
  }
  
  /**
   * 返回农历y年闰月的天数
   * @param {number} year 农历年
   */
  function leapDays(year) {
    if (leapMonth(year)) {
      return (lunarInfo[year - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
  }
  
  /**
   * 返回农历y年m月的总天数
   * @param {number} year 农历年
   * @param {number} month 农历月
   */
  function monthDays(year, month) {
    return (lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29;
  }
  
  /**
   * 传入阳历年月日获得详细的农历信息
   * @param {number} y 阳历年
   * @param {number} m 阳历月
   * @param {number} d 阳历日
   * @returns {Object} 农历信息
   */
  function solar2lunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31
    if (y < 1900 || y > 2100) {
      return -1;
    }
    
    // 阳历传参：月减1
    if (m === 0) {
      m = 12;
      y -= 1;
    }
    
    // 输入的月份减1处理
    m = m - 1;
    
    // 获取阳历对应的农历
    let i, leap = 0, temp = 0;
    // 修正ymd参数
    let baseDate = new Date(1900, 0, 31);
    let objDate = new Date(y, m, d);
    
    // 计算两个阳历日期差
let offset = (objDate.getTime() - baseDate.getTime()) / 86400000;    
    // 确定农历年份
    let lunarYear = 1900;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      lunarYear++;
    }
    
    if (offset < 0) {
      offset += temp;
      lunarYear--;
    }
    
    // 农历年份确定后，开始计算月份
    let lunarMonth = 1;
    let isLeap = false;
    leap = leapMonth(lunarYear); // 闰哪个月
    
    // 计算月份
    for (i = 1; i < (leap ? 13 : 12) + 1 && offset > 0; i++) {
      if (leap > 0 && i === (leap + 1) && isLeap === false) {
        --i;
        isLeap = true;
        temp = leapDays(lunarYear);
      } else {
        temp = monthDays(lunarYear, i);
      }
      
      // 解除闰月
      if (isLeap === true && i === (leap + 1)) {
        isLeap = false;
      }
      
      offset -= temp;
      if (!isLeap) {
        lunarMonth++;
      }
    }
    
    // 修正闰月下个月的情况
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
        --lunarMonth;
      }
    }
    
    // 农历月份确定后，计算日期
    if (offset < 0) {
      offset += temp;
      --i;
      --lunarMonth;
    }
    
    let lunarDay = offset + 1;
    
    // 返回农历节日
    const lunarDateString = formatLunar(lunarYear, lunarMonth, lunarDay);
    const lunarFes = getLunarFestival(lunarMonth, lunarDay);
    const solarFes = getSolarFestival(m + 1, d);
    
    return {
      lunarYear: lunarYear,
      lunarMonth: lunarMonth,
      lunarDay: lunarDay,
      isLeap: isLeap,
      lunarDateString: lunarDateString,
      lunarFestival: lunarFes,
      solarFestival: solarFes
    };
  }
  
  /**
   * 返回农历y年的总天数
   * @param {number} year 年份
   */
  function lYearDays(year) {
    let sum = 348;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      sum += (lunarInfo[year - 1900] & i) ? 1 : 0;
    }
    return sum + leapDays(year);
  }
  
  /**
   * 格式化农历日期显示
   * @param {number} y 农历年
   * @param {number} m 农历月
   * @param {number} d 农历日
   */
  function formatLunar(y, m, d) {
    const yStr = formatLunarYear(y);
    const mStr = formatLunarMonth(m);
    const dStr = formatLunarDay(d);
    return yStr + mStr + dStr;
  }
  
  /**
   * 格式化农历年
   * @param {number} y 农历年
   */
  function formatLunarYear(y) {
    return '农历' + y + '年';
  }
  
  /**
   * 格式化农历月
   * @param {number} m 农历月
   */
  function formatLunarMonth(m) {
    return nStr2[m - 1] + '月';
  }
  
  /**
   * 格式化农历日
   * @param {number} d 农历日
   */
  function formatLunarDay(d) {
    let s;
    switch (d) {
      case 10:
        s = '初十';
        break;
      case 20:
        s = '二十';
        break;
      case 30:
        s = '三十';
        break;
      default:
        s = nStr3[Math.floor(d / 10)];
        s += nStr1[d % 10];
    }
    return s;
  }
  
  /**
   * 获取农历节日
   * @param {number} m 农历月
   * @param {number} d 农历日
   */
  function getLunarFestival(m, d) {
    const key = ('0' + m).slice(-2) + ('0' + d).slice(-2);
    return lunarFestival[key] || '';
  }
  
  /**
   * 获取阳历节日
   * @param {number} m 阳历月
   * @param {number} d 阳历日
   */
  function getSolarFestival(m, d) {
    const key = ('0' + m).slice(-2) + ('0' + d).slice(-2);
    return solarFestival[key] || '';
  }
  
  export default {
    solar2lunar
  };
  