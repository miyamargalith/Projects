import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class Main {

    protected static String keyStorePass = null;
    protected static String aliasKeyPass = null;
    protected static Properties prop = null;

    public static void main(String[] args) {
        try {
            if (args.length != 3) {
                System.out.println("missing arguments");
                return;
            }

            String mode = args[0]; // encryption or decryption
            //String keyStorePass = args[1];
            keyStorePass = args[1];
            aliasKeyPass = args[2];


            InputStream input = new FileInputStream("prop.properties");
            prop = new Properties();
            prop.load(input);
            OutputStream output = new FileOutputStream("prop.properties");
            if (mode.toLowerCase().equals("encrypt")) {
                Encrypt.encryptFunc(output);
                System.out.println("Your file is now encrypted");
            } else if (mode.toLowerCase().equals("decrypt")) {
                Decrypt.decryptFunc();
                System.out.println("Your file is now decrypted");
            } else {
                System.out.println("invalid argument");
            }
            prop.store(output, "");
            input.close();
            output.close();


        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try{
                if (prop != null) {
                    OutputStream output = new FileOutputStream("prop.properties");
                    prop.store(output, "");
                }

            } catch (Exception e) {
                System.out.println(e);
            }
        }


    }
}