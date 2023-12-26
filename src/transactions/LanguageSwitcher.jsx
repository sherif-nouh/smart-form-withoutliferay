import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher(props) {
  const { i18n } = useTranslation();

  

  useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang]);

  return (
    <div>
      {/* <button className='btn btn-group-lg' onClick={() => changeLanguage('en')}>English</button>
      <button className='btn btn-group-lg' onClick={() => changeLanguage('ar')}>العربية</button> */}
    </div>
  );
}

export default LanguageSwitcher;