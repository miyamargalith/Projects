import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.util.Base64;
import java.util.Properties;

public class Decrypt {
    private static final Properties propMain = Main.prop;
    //    private static final String ALIASSIDEAKEY = "NadavKey";
//    private static final String CIPHERALG = "AES/CBC/PKCS5Padding";
//    private static final String CIPHERTEXTPATH = "EncryptedFile.txt";
//    private static final String DECRYPTTEXTPATH = "decrypted.txt";
//    private static final String KEYSTORESIDEBNAME = "Miya.keystore";
//    private static final String KEYSTORESIDEBPASS = Main.keyStorePass;
//    private static final String ALIASSIDEBKEY = "MiyaKey";
//    private static final String ALIASSIDEBKEYPASS = Main.aliasKeyPass;
//    private static final String SIGNATUREALG = "SHA256withRSA";
//    private static final String ENCRYPTSYMKEYALG = "RSA/ECB/PKCS1Padding";
//    private static final String SYMETRICKEYALG = "AES";
    private static final String ALIASSIDEAKEY = propMain.getProperty("ALIASSIDEAKEY");
    private static final String CIPHERALG = propMain.getProperty("CIPHERALG");
    private static final String CIPHERTEXTPATH = propMain.getProperty("CIPHERTEXTPATH");
    private static final String DECRYPTTEXTPATH = propMain.getProperty("DECRYPTTEXTPATH");
    private static final String KEYSTORESIDEBNAME = propMain.getProperty("KEYSTORESIDEBNAME");
    private static final String KEYSTORESIDEBPASS = Main.keyStorePass;
    private static final String ALIASSIDEBKEY = propMain.getProperty("ALIASSIDEBKEY");
    private static final String ALIASSIDEBKEYPASS = Main.aliasKeyPass;
    private static final String SIGNATUREALG = propMain.getProperty("SIGNATUREALG");
    private static final String ENCRYPTSYMKEYALG = propMain.getProperty("ENCRYPTSYMKEYALG");
    private static final String SYMETRICKEYALG = propMain.getProperty("SYMETRICKEYALG");

    /**
     * The function checks the integrity of the file and if it works it decrypts the file
     * if the integrity check fails it prints an error both to screen and to file
     * @throws InvalidAlgorithmParameterException
     * @throws NoSuchAlgorithmException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws SignatureException
     * @throws KeyStoreException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws CertificateException
     * @throws UnrecoverableKeyException
     * @throws NoSuchPaddingException
     */
    public static void decryptFunc() throws InvalidAlgorithmParameterException, NoSuchAlgorithmException, IOException,
            InvalidKeyException, SignatureException, KeyStoreException, BadPaddingException, IllegalBlockSizeException,
            CertificateException, UnrecoverableKeyException, NoSuchPaddingException {

        String key = propMain.getProperty("secretKey");
        String digsignCheck = propMain.getProperty("digitalSignature");
        String iv = propMain.getProperty("IV");
        if (!checkIntegrity(digsignCheck)) { // the integrity check has failed
            System.out.println("The integrity check has failed.");
            FileOutputStream fos = new FileOutputStream(DECRYPTTEXTPATH);
            fos.write("The integrity check has failed.".getBytes());
            fos.close();
            return;

        }
        decryptFile(key, iv);

    }

    /**
     * @return get Side B key store
     * @throws KeyStoreException
     * @throws FileNotFoundException
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws CertificateException
     */
    private static KeyStore loadSideBKeyStore() throws KeyStoreException, FileNotFoundException,
            IOException, NoSuchAlgorithmException, CertificateException {
        // create a key store object
        KeyStore ks = KeyStore.getInstance("jceks");
        // load the key store
        ks.load(new FileInputStream(KEYSTORESIDEBNAME), KEYSTORESIDEBPASS.toCharArray());

        return ks;
    }

    /**
     * the function decrypts the key that it received with the private key of the user
     *
     * @param key - the key to decrypt
     * @return
     * @throws NoSuchAlgorithmException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws NoSuchPaddingException
     * @throws KeyStoreException
     * @throws CertificateException
     * @throws UnrecoverableKeyException
     */
    private static SecretKey decryptKey(String key) throws NoSuchAlgorithmException, IOException,
            InvalidKeyException, IllegalBlockSizeException, BadPaddingException, NoSuchPaddingException,
            KeyStoreException, CertificateException, UnrecoverableKeyException {

        byte[] keyByte = Base64.getDecoder().decode(key);
        KeyStore ks = loadSideBKeyStore();
        PrivateKey privateKey = (PrivateKey) ks.getKey(ALIASSIDEBKEY, ALIASSIDEBKEYPASS.toCharArray());
        Cipher cipher = Cipher.getInstance(ENCRYPTSYMKEYALG);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] keyDecrypt = cipher.doFinal(keyByte);

        return (new SecretKeySpec(keyDecrypt, SYMETRICKEYALG));

    }

    /**
     * the function decrypts the file and write the plain text into a new file
     *
     * @param key - the symetric key to encrypt
     * @param iv  - the iv to decrypt the file
     * @throws InvalidAlgorithmParameterException
     * @throws NoSuchAlgorithmException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws NoSuchPaddingException
     * @throws KeyStoreException
     * @throws CertificateException
     * @throws UnrecoverableKeyException
     */
    private static void decryptFile(String key, String iv) throws InvalidAlgorithmParameterException, NoSuchAlgorithmException,
            IOException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException,
            NoSuchPaddingException, KeyStoreException, CertificateException, UnrecoverableKeyException {

        byte[] ivByte = Base64.getDecoder().decode(iv);
        IvParameterSpec ivParam = new IvParameterSpec(ivByte);

        SecretKey secretKey = decryptKey(key);

        Cipher cipher = Cipher.getInstance(CIPHERALG);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParam);

        FileInputStream fis = new FileInputStream(CIPHERTEXTPATH);
        CipherInputStream cis = new CipherInputStream(fis, cipher);

        FileOutputStream fos = new FileOutputStream(DECRYPTTEXTPATH);

        byte[] data = new byte[8];
        int i;
        while ((i = cis.read(data)) != -1) {
            fos.write(data, 0, i);
        }

        // close the input / output streams used
        cis.close();
        fis.close();
        fos.close();


    }

    /**
     * the function checks the integrity of the digital signature
     *
     * @param digSignCheck - the digital signature to check with
     * @return returns TRUE if the digital signature is valid, and false otherwise
     * @throws NoSuchAlgorithmException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws SignatureException
     * @throws KeyStoreException
     * @throws CertificateException
     */
    private static Boolean checkIntegrity(String digSignCheck) throws NoSuchAlgorithmException, IOException,
            InvalidKeyException, SignatureException, KeyStoreException, CertificateException {

        KeyStore ks = loadSideBKeyStore();

        //Keep the integrity of the data
        // create a file input stream from encrypted file
        FileInputStream cfis = new FileInputStream(CIPHERTEXTPATH);
        //create object digital signature
        Signature digSign = Signature.getInstance(SIGNATUREALG);
        Certificate cert = ks.getCertificate(ALIASSIDEAKEY);
        PublicKey publicKey = cert.getPublicKey();

        digSign.initVerify(publicKey);
        byte[] dataX = new byte[8];
        int j;
        while ((j = cfis.read(dataX)) != -1) {
            digSign.update(dataX, 0, j);
        }
        byte[] sig = Base64.getDecoder().decode(digSignCheck);
        boolean verify = digSign.verify(sig);
        return verify;

    }

}
