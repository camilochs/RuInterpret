	//RuInterpret v0.1
	
	var a_codes = [0,0,0];

	var selectStart = 0;
	function check(codekey, e){


	 e.stopPropagation(); 
     if(e.preventDefault) e.preventDefault();
     e.stopImmediatePropagation();

	  function Interpreter(){}
	  var code=e.which;
	  
	  Interpreter.prototype.letter  = code;
	  Interpreter.prototype.codeKey  = code;
	  Interpreter.prototype.clear_space = 0;
	  Interpreter.prototype.state 		= false;
	  

	  Interpreter.prototype.textArea 	= document.getElementById("interpreter_txtarea");
	  Interpreter.prototype.map_letter 	= {	//Key code
					97 : "\u0430", 	
					98 : "\u0431",
					99 : "\u0446",	
					100 : "\u0434",	
					101 : "\u0435",
					102 : "\u0444",
					103 : "\u0433",
					104 : "\u0445",
					105 : "\u0438",
					106 : "\u0439",
					107 : "\u043a",
					108 : "\u043b",
					109 : "\u043c",
					110 : "\u043d",
					111 : "\u043e", 
					112 : "\u043f",
					113 : "\u044f",
					114 : "\u0440",
					115 : "\u0441",
					116 : "\u0442",
					117 : "\u0443",
					118 : "\u0432",
					119 : "\u0449",
					120 : "\u0445",
					121 : "\u044b",
					122 : "\u0437",
					217 : "\u0451",
					226 : "\u0436",
					203 : "\u0447",
					219 : "\u0448",
					207 : "\u0437",
					223 : "\u044e",
					203 : "\u0447",
					39 : "\u044c",
					35 : "\u044a",
					70 : "\u044a",
					323 : "\u0449"
				};
	 Interpreter.prototype.key_lower 	= {	//Key code
					o : 111,
					h : 104,
					u : 117,
					j : 106,
					s : 115,
					sharp : 35
	};
	Interpreter.prototype.key_upper 	= {	//Key code
					o : 111-32,
					h : 104-32,
					u : 117-32,
					j : 106-32,
					s : 115-32,
					sharp : 35 //#
	};
	//console.log(code);
	a_codes[2] = a_codes[1];
	a_codes[1] = a_codes[0];
	a_codes[0] = code;
	
	//console.log(a_codes);
	Interpreter.prototype.I_check_letter =	function(){
			//Primera letra
			//[jo], [zh],[ch], [sh], [je], [ju], [ja]

			var a_key_codes = [106, 122, 99, 115, 323, 35];
			for(var i = 0; i < a_key_codes.length; ++i){
				var first_element  = a_codes[0];
				var second_element = a_codes[1];
				var third_element  = a_codes[2];

				if(second_element === a_key_codes[i] || second_element === (a_key_codes[i]-32)){
					if(this.I_validation_lower(first_element)){
						this.clear_space = 1;
						return this.map_letter[ first_element + second_element ];
					}else if(this.I_validation_upper(first_element)){
						this.clear_space = 1;
						return this.map_letter[ first_element + second_element + 64 ].toUpperCase();
					}else if(second_element == this.key_lower.sharp && first_element == this.key_upper.sharp ){
						this.clear_space = 1;
						return this.map_letter[ first_element ].toUpperCase();
					}
				}else{
					if(this.I_validation_special_lower(first_element, third_element)){ // shh 
						this.clear_space = 1;
						return this.map_letter[first_element + second_element + third_element];
					}else if(this.I_validation_special_upper(first_element, third_element)){
						this.clear_space = 1;
						return this.map_letter[first_element + second_element + third_element + 96].toUpperCase();
					}

				}

			}
			
			return;
	};
	Interpreter.prototype.transcript_to_russian = function(){
		if ('selectionStart' in this.textArea){
			//alert("first" + this.textArea.selectionStart );
			var detect_special_letter = this.I_check_letter();
		    if (this.textArea.selectionStart == this.textArea.textLength){
		    	if ( detect_special_letter != null){
		    		this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart-1) +  detect_special_letter;

		    	}else{
		    		this.textArea.value += ( this.state ) ? this.letter : String.fromCharCode(this.letter);
		    	}
		    } 
		    else {
		    	if(this.state){
			    	var s_part = this.textArea.value.substring(this.textArea.selectionStart, this.textArea.value.length );

			    	
			    	if(this.textArea.selectionStart == this.textArea.selectionEnd){
			    		if ( detect_special_letter != null){

			    			this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart-this.clear_space) + detect_special_letter + s_part;
			    		}else{
			    			this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart) + this.letter + s_part;
			    		}
			    		//console.log(this.textArea.selectionEnd);
			    		if(this.stateMouse) this.textArea.selectionEnd   -=  s_part.length; 
						
			    		
			    	}else{
			    		if(this.textArea.value.length == this.textArea.selectionEnd){

			    			this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart) + this.letter;
			    			this.textArea.selectionStart += 1; 
			    		}else{
			    			var t = this.textArea.value.substring( this.textArea.selectionEnd);
			    			this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart) + this.letter + t;
			    			this.textArea.selectionEnd -= t.length ; 
			    		}
			    		
			    	
			    	}
			    	
		    	}else{
		    		if(this.textArea.selectionStart == this.textArea.selectionEnd){
						var t = this.textArea.value.substring( this.textArea.selectionEnd);
		    			this.textArea.value = this.textArea.value.substring(0, this.textArea.selectionStart) + String.fromCharCode(this.letter) + t;
		    			this.textArea.selectionEnd -= t.length ; 
		    		}
		    		else{
		    			this.textArea.value += String.fromCharCode(this.letter);
		    		}
		    	}
		    	
		    } 
		}


	};
	Interpreter.prototype.I_validation_lower = function(code){

			return code == this.key_lower.o || code == this.key_lower.h || code == this.key_lower.u;

	};
	Interpreter.prototype.I_validation_upper = function(code){

			return code == this.key_upper.o || code == this.key_upper.h || code == this.key_upper.u;

	};
	Interpreter.prototype.I_validation_special_lower = function(first_code, third_element){

			return (first_code === this.key_lower.h && third_element === this.key_lower.s ) ||

					(first_code === this.key_lower.u && third_element === this.key_lower.j )	;

	};
	Interpreter.prototype.I_validation_special_upper = function(first_code, third_element){

			return first_code === this.key_upper.h && third_element === this.key_upper.s;

	};
	var interpreter = new Interpreter();
	 
	 exist_letter(interpreter);
	 interpreter.transcript_to_russian();
	}

	function exist_letter(interpreter, code){

		 if( interpreter.map_letter[interpreter.letter] != null ){
		 	interpreter.letter = interpreter.map_letter[interpreter.letter];
		 	interpreter.state =  true;
		 }else{
		 	if( interpreter.letter < 100 && interpreter.map_letter[interpreter.letter + 32] != null ){
	 			interpreter.letter = interpreter.map_letter[interpreter.letter + 32].toUpperCase();
	 			interpreter.state =  true;
		 	}
		 }
		
	}
	function send_letter(letter, e){
		check(letter.charCodeAt(0), e);
	}


	$(document).ready(function(){
		$("#interpreter_txtarea").focus();
	});

