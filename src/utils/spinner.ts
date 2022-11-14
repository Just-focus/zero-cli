const ora = require('ora');

const spinner = ora();
let lastMsg = null;

// 通知加载
export const stopSpinner = (persist?: boolean) => {
  if (!spinner.isSpinning) {
    return
  }

  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}