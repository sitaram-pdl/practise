export function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function validateURL(url) {
  if (
    /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url,
    )
  ) {
    return true;
  }
  return false;
}

export function getDomain(url) {
  const hostname = new URL(url).hostname;
  return hostname.replace('www.', '');
}
