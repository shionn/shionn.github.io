<%@ page pageEncoding="UTF-8"%> 
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="t"%>
<t:template>
	<jsp:attribute name="title">Shionn::blog() - Be a geeK - 405</jsp:attribute>
	<jsp:attribute name="content">
		<div class="e405">
			<p><em>Mince alors !</em> Il semblerait que vous n'êtes pas autorisé à faire cela.</p>
			<p>Si vous essayer de poster un commentaire, il se pourrait que mon blog 
			vous ai détécté comme un bot. <br/>Cependant si cela n'est pas le cas, merci 
			de me contacter par <a href="mailto:shionn@gmail.com">email</a></p>
			<h1>405</h1>
		</div>
	</jsp:attribute>
</t:template>
