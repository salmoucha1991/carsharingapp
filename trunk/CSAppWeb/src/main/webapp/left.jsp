<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>

<div id="containerLeft"> 
 		<ul> 
			<li><a href="#fragment-1"><span>Login</span></a></li> 
            <li><a href="#fragment-2"><span>Inscription</span></a></li> 
         </ul> 
            <div id="fragment-1"> 
				<s:div id="loginDiv">
					<div>
				    	<form method="post" id="login_form">
							<span style="width: 160px;">Login</span> <input name="username" class="" size="4"/> <br />
							<span style="width: 160px;">Password</span><input name="password" type="password" size="4"/><br />
							<input type="submit" class="toto"/>		     
						</form>
				    </div>
				</s:div>
            </div> 
            <div id="fragment-2">
	            <h2>
	            	Inscription
	            </h2>
            </div> 
        </div> 