htmlmin -o signatureTemplates/bam-signature.min.html signatureTemplates/bam-signature.html
htmlmin -o signatureTemplates/theodo-signature.min.html signatureTemplates/theodo-signature.html
htmlmin -o signatureTemplates/m33-signature.min.html signatureTemplates/m33-signature.html
echo 'signature templates minimized'
echo 'You need to update signature dates in loadSignatureTemplate.js'
