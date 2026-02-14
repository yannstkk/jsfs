var contentTypeUtil = {

    getContentType: function(filePath) {
        var extension = filePath.split('.').pop();

        if (extension === 'html') { return 'text/html'; }
        if (extension === 'js')   { return 'application/javascript'; }
        if (extension === 'css')  { return 'text/css'; }
        if (extension === 'json') { return 'application/json'; }
        if (extension === 'png')  { return 'image/png'; }
        if (extension === 'jpg' || extension === 'jpeg') { return 'image/jpeg'; }
        if (extension === 'ico')  { return 'image/x-icon'; }

        return 'text/plain';
    }

};

module.exports = contentTypeUtil;
