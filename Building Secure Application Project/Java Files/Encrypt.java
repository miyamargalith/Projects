import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import java.io.*;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.util.Base64;
import java.util.Properties;

public class Encrypt {
    private static final Properties propMain = Main.prop;
//    private static final String IVALG = "SHA1PRNG";
//    private static final String CIPHERALG = "AES/CBC/PKCS5Padding";
//    private static final String PLAINTEXTPATH = "plaintext.txt";
//    private static final String CIPHERTEXTPATH = "EncryptedFile.txt";
//    private static final String KEYSTORESIDEANAME = "Nadav.keystore";
//    private static final String KEYSTORESIDEAPASS = Main.keyStorePass;
//    private static final String ALIASSIDEAKEY = "NadavKey";
//    private static final String ALIASSIDEAKEYPASS = Main.aliasKeyPass;
//    private static final String SIGNATUREALG = "SHA256withRSA";
//    private static final String ALIASSIDEBKEY = "MiyaKey";
//    private static final String ENCRYPTSYMKEYALG = "RSA/ECB/PKCS1Padding";
//    private static final String SYMETRICKEYALG = "AES";

    private static final String IVALG = propMain.getProperty("IVALG");
    private static final String CIPHERALG = propMain.getProperty("CIPHERALG");
    private static final String PLAINTEXTPATH = propMain.getProperty("PLAINTEXTPATH");
    private static final String CIPHERTEXTPATH = propMain.getProperty("CIPHERTEXTPATH");
    private static final String KEYSTORESIDEANAME = propMain.getProperty("KEYSTORESIDEANAME");
    private static final String KEYSTORESIDEAPASS = Main.keyStorePass;
    private static final String ALIASSIDEAKEY = propMain.getProperty("ALIASSIDEAKEY");
    private static final String ALIASSIDEAKEYPASS = Main.aliasKeyPass;
    private static final String SIGNATUREALG = propMain.getProperty("SIGNATUREALG");
    private static final String ALIASSIDEBKEY = propMain.getProperty("ALIASSIDEBKEY");
    private static final String ENCRYPTSYMKEYALG = propMain.getProperty("ENCRYPTSYMKEYALG");
    private static final String SYMETRICKEYALG = propMain.getProperty("SYMETRICKEYALG");

    /**
     * @param output - the output file for properties file
     * @throws FileNotFoundException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws CertificateException
     * @throws KeyStoreException
     * @throws UnrecoverableKeyException
     * @throws SignatureException
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws InvalidAlgorithmParameterException
     */
    public static void encryptFunc(OutputStream output) throws FileNotFoundException, IOException,
            InvalidKeyException, CertificateException, KeyStoreException, UnrecoverableKeyException,
            SignatureException, NoSuchPaddingException, NoSuchAlgorithmException,
            IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {
        createACipherFile();
        createASign();

    }

    /**
     * generate the IV for symetric key
     * @return IvParameterSpec
     * @throws NoSuchAlgorithmException
     */
    private static IvParameterSpec generateIV() throws NoSuchAlgorithmException {

        //todo check which sha to use
        SecureRandom secRandom = SecureRandom.getInstance(IVALG);
        byte[] iv = new byte[16];
        secRandom.nextBytes(iv);
        IvParameterSpec ivParam = new IvParameterSpec(iv);
        String ivSend = Base64.getEncoder().encodeToString(iv);
        propMain.setProperty("IV", ivSend);

        return ivParam;
    }

    /**
     * generates a secret symetric key
     * @return a secret key
     * @throws KeyStoreException
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws CertificateException
     * @throws NoSuchPaddingException
     * @throws InvalidKeyException
     */
    private static SecretKey generateSymetricKey() throws KeyStoreException, IOException,
            NoSuchAlgorithmException, CertificateException, NoSuchPaddingException,
            IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        //Generate a symmetric key with the IV
        KeyGenerator kg = KeyGenerator.getInstance(SYMETRICKEYALG);
        SecretKey ks = kg.generateKey();
        encryptSymKey(ks);
        return ks;
    }

    /**
     * creates and initializes a cipher object
     * @return an initialized cipher object
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws KeyStoreException
     * @throws CertificateException
     * @throws IOException
     */
    private static Cipher createAndInitCipherObj() throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidAlgorithmParameterException, InvalidKeyException, KeyStoreException,
            IllegalBlockSizeException, BadPaddingException, CertificateException, IOException {
        IvParameterSpec ivSpec = generateIV();
        SecretKey secKey = generateSymetricKey();
        // Create a cipher object with the needed algorithm
        Cipher cipher = Cipher.getInstance(CIPHERALG);
        //init Cipher object
        cipher.init(Cipher.ENCRYPT_MODE, secKey, ivSpec);
        return cipher;
    }

    /**
     * Converts the plain text file to a cipher text file, and creates the cipher file
     * @throws FileNotFoundException
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws CertificateException
     * @throws KeyStoreException
     */
    private static void createACipherFile() throws FileNotFoundException, IOException, NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException, CertificateException, KeyStoreException {

        Cipher cipher = createAndInitCipherObj();
        // the plain text
        FileInputStream fis = new FileInputStream(PLAINTEXTPATH);
        // the cipher text
        FileOutputStream fos = new FileOutputStream(CIPHERTEXTPATH);
        // the cipher output stream
        CipherOutputStream cos = new CipherOutputStream(fos, cipher);

        // read a plain a text and convert it to cipher
        byte[] data = new byte[8];
        int i;
        while ((i = fis.read(data)) != -1) {
            cos.write(data, 0, i);
        }
        // close the input / output streams used
        cos.close();
        fis.close();
        fos.close();
    }

    /**
     * @return get Side A key store
     * @throws KeyStoreException
     * @throws FileNotFoundException
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws CertificateException
     */
    private static KeyStore loadSidaAKeyStore() throws KeyStoreException, FileNotFoundException,
            IOException, NoSuchAlgorithmException, CertificateException {
        // create a key store object
        KeyStore ks = KeyStore.getInstance("jceks");
        // load the key store
        ks.load(new FileInputStream(KEYSTORESIDEANAME), KEYSTORESIDEAPASS.toCharArray());

        return ks;
    }

    /**
     * The function creates a digital signture on the encrypted file and saves it to properties file
     * @throws FileNotFoundException
     * @throws NoSuchAlgorithmException
     * @throws IOException
     * @throws InvalidKeyException
     * @throws SignatureException
     * @throws KeyStoreException
     * @throws CertificateException
     * @throws UnrecoverableKeyException
     */
    private static void createASign() throws FileNotFoundException, NoSuchAlgorithmException, IOException,
            InvalidKeyException, SignatureException, KeyStoreException, CertificateException, UnrecoverableKeyException {

        KeyStore ks = loadSidaAKeyStore();

        //Keep the integrity of the data
        // create a file input stream from encrypted file
        FileInputStream cfis = new FileInputStream(CIPHERTEXTPATH);


        //create object digital signature
        Signature digSign = Signature.getInstance(SIGNATUREALG);

        //get private key
        PrivateKey privateKey = (PrivateKey) ks.getKey(ALIASSIDEAKEY, ALIASSIDEAKEYPASS.toCharArray());
        //sign with private key
        digSign.initSign(privateKey);


        byte[] dataX = new byte[8];
        int j;
        while ((j = cfis.read(dataX)) != -1) {
            digSign.update(dataX, 0, j);
        }


        //We have digital signature

        byte[] sig = digSign.sign();
        String str = Base64.getEncoder().encodeToString(sig);
        propMain.setProperty("digitalSignature", str);


    }

    /**
     * the function encrypts the secretkey
     * @param secKey - the secret key to encrypt
     * @throws KeyStoreException
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws CertificateException
     * @throws NoSuchPaddingException
     * @throws InvalidKeyException
     */
    private static void encryptSymKey(SecretKey secKey) throws KeyStoreException, IOException,
            NoSuchAlgorithmException, CertificateException, NoSuchPaddingException,
            InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        KeyStore ks = loadSidaAKeyStore();
        //encrypt the key with RSA and with public key from Certificate
        Certificate cert = ks.getCertificate(ALIASSIDEBKEY);
        PublicKey publicKey = cert.getPublicKey();
        Cipher cipherRSA = Cipher.getInstance(ENCRYPTSYMKEYALG);
        cipherRSA.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encryptKey =  cipherRSA.doFinal(secKey.getEncoded());
        String str = Base64.getEncoder().encodeToString(encryptKey);
        propMain.setProperty("secretKey", str);
    }


}
