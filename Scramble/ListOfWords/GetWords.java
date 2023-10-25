import java.util.Scanner;
import java.io.File;
import java.io.PrintStream;
import java.io.IOException;

public class GetWords{
	public static void main(String[] args) throws IOException{
		File f = new File("words.csv");
		File out = new File ("myWords.txt"); // Output file, it makes a new one
		Scanner s = new Scanner(f); 
		PrintStream ps = new PrintStream(out); 
		s.nextLine(); // The first line is just the titles
		while (s.hasNextLine()){
			String t = s.nextLine();
			String[] ts = t.split(",");
			String word = ts[1]; // second column has the word
			for (int i = 0; i < word.length(); i++){ // Parse the word and remove anything that's not a letter
				char c = word.toLowerCase().charAt(i);
				int ascii = (int) c;
				if (!(ascii < 123 && ascii > 60)){
					word = word.replace(String.valueOf(c), "");
				}
			}
			word = word.replace("(adjective","");
			word = word.replace("(verb", ""); 
			word = word.replace("(", " ");  
			ps.print(word + " "); // Write to the file
			ps.flush(); // Ensure it's outputted to the file
		}
		s.close();
		ps.close();
	}
}