import java.util.Scanner;
import java.io.File;
import java.io.PrintStream;
import java.io.IOException;

public class GetDefs{
	public static void main(String[] args) throws IOException{
		File f = new File("words.csv");
		File out = new File ("myDefs.txt"); // Output file, it makes a new one
		Scanner s = new Scanner(f); 
		PrintStream ps = new PrintStream(out); 
		s.nextLine(); // The first line is just the titles
		while (s.hasNextLine()){
			String t = s.nextLine();
			String[] ts = t.split(",");
			String def = ""; // second column has the definition
			for (int i = 2; i < ts.length; i++){
				def += ts[i] + " "; 
			}
			def = def.replace("\"", "");
			ps.print(def + "+"); // Write to the file. + will be the split character
			ps.flush(); // Ensure it's outputted to the file
		}
		s.close();
		ps.close();
	}
}