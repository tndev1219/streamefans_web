import moment from 'moment';
import 'moment/locale/ja';

export const getPostDate = (dateString, locale=false) => {
    if (locale) {
        return moment(dateString).locale('ja').fromNow();
    } else {
        return moment(dateString).locale('en').fromNow();
    }
};