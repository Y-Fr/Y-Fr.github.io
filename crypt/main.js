/*import random

def is_odd_letter(letter):
    if ord(letter) % 2 == 1:
        return True
    return False

def generate_random_letter(is_odd):
    if is_odd:
        return chr(random.choice(range(98,124,2)))
    else:
        return chr(random.choice(range(97,123,2)))

def encrypt(text,key):
    encrypted = []
    for i in range(len(text)):
        letter = text[i]
        is_odd = is_odd_letter(letter)
        if(letter.isalpha()):
            letter = letter.lower()
            e_letter = ""

            if(is_odd_letter(letter)):
                e_letter = chr(ord(letter) + key - 26) if (ord(letter) + key > 122) else chr(ord(letter) + key)
            else:
                e_letter = chr(ord(letter) - key + 26) if (ord(letter) - key < 97) else chr(ord(letter) - key)

            fog = ""
            for j in range(i+2):
                fog += generate_random_letter(is_odd)

            idx = random.choice(range(i+1))
            fog = fog[:idx] + e_letter + fog[idx:]
            encrypted.append(fog)
        else:
            encrypted.append(letter)
    return "# "+str(key)+" "+" ".join(shuffle(encrypted))

def shuffle(encrypted: list):
    random.shuffle(encrypted)
    return encrypted

def decrypt(encrypted):
    encrypted = encrypted.split(" ")
    mode = encrypted[0]
    key = int(encrypted[1])
    decrypted = encrypted[2:]
    decrypted.sort(key=lambda x: len(x))
    for i in range(len(decrypted)):
        odd = ""
        even = ""
        for letter in decrypted[i]:
            if is_odd_letter(letter):
                odd += letter
            else:
                even += letter

        d1 = even if len(odd) > len(even) else odd
        if(not is_odd_letter(d1)):
            d2 = chr(ord(d1) + key - 26) if (ord(d1) + key > 122) else chr(ord(d1) + key)
        else:
            d2 = chr(ord(d1) - key + 26) if (ord(d1) - key < 97) else chr(ord(d1) - key)

        decrypted[i] = d2
    return "".join(decrypted)


#e = encrypt("woaini", 12)
#print(e,end="\n\n")
#print(decrypt(e))

t=""
k=0
print("commands:help(h)/encrypt(e)/recrypt(r)/decrypt(d)/quit(q)")
while True:
    command = input("> ")
    command = command.split(" ")
    if command[0] == "help" or command[0] == "h":
        print("encrypt(e) - encrypt a string\n")
        print("decrypt(d) - decrypt a string\n")
        print("recrypt(r) - recrypt the last encrypted string\n")
        print("help(h) - show help\n")
        print("quit(q) - quit the program\n")

    elif command[0] == "encrypt" or command[0] == "e":
        t = input("Enter text to encrypt: ")
        text = t
        k = int(input("Enter key: "))
        key = k
        print(encrypt(text,key))
    elif command[0] == "decrypt" or command[0] == "d":
        text = input("Enter text to decrypt: ")
        print(decrypt(text))
    elif command[0] == "quit" or command[0] == "q":
        break
    elif command[0] == "recrypt" or command[0] == "r":
        print(encrypt(t,k))
    else:
        print("Invalid command")
*/



function isOddLetter(letter) {
    return letter.charCodeAt() % 2 === 1;
}

function generateRandomLetter(isOdd) {
    if(isOdd) {
        return String.fromCharCode(Math.floor(Math.random() * 13) * 2 + 98);
    } else {
        return String.fromCharCode(Math.floor(Math.random() * 13) * 2 + 97);
    }
}

function encrypt(text, key) {
    let encrypted = [];
    for(let i = 0; i < text.length; i++) {
        let letter = text[i];
        let isOdd = isOddLetter(letter);
        if(letter.match(/[a-zA-Z]/)) {
            letter = letter.toLowerCase();
            let eLetter = "";
            if(isOddLetter(letter)) {
                eLetter = String.fromCharCode((letter.charCodeAt() + key - 26) % 122);
            } else {
                eLetter = String.fromCharCode((letter.charCodeAt() - key + 26) % 122);
            }
            let fog = "";
            for(let j = 0; j < i + 2; j++) {
                fog += generateRandomLetter(isOdd);
            }
            let idx = Math.floor(Math.random() * (i + 1));
            fog = fog.slice(0, idx) + eLetter + fog.slice(idx);
            encrypted.push(fog);
        } else {
            encrypted.push(letter);
        }
    }
    return "# " + key + " " + shuffle(encrypted).join(" ");
}

function shuffle(encrypted) {
    return encrypted.sort(() => Math.random() - 0.5);
}

function decrypt(encrypted) {
    encrypted = encrypted.split(" ");
    let mode = encrypted[0];
    let key = parseInt(encrypted[1]);
    let decrypted = encrypted.slice(2);
    decrypted.sort((a, b) => a.length - b.length);
    for(let i = 0; i < decrypted.length; i++) {
        let odd = "";
        let even = "";
        for(let letter of decrypted[i]) {
            if(isOddLetter(letter)) {
                odd += letter;
            } else {
                even += letter;
            }
        }
        let d1 = odd.length > even.length ? odd : even;
        let d2 = isOddLetter(d1) ? String.fromCharCode((d1.charCodeAt() - key + 26) % 122) : String.fromCharCode((d1.charCodeAt() + key) % 122);
        decrypted[i] = d2;
    }
    return decrypted.join("");
}

function decryptstr() {
    let encrypted = document.getElementById("encrypted").value;
    document.getElementById("decrypted").value = decrypt(encrypted);
}

function encryptstr() {
    let text = document.getElementById("text").value;
    let key = parseInt(document.getElementById("key").value);
    document.getElementById("encrypted").value = encrypt(text, key);
}







