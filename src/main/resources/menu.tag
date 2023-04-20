<%@ tag pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags/frag" %>
<%@ attribute name="menu" type="shionn.blog.db.dbo.Menu" %>
<ul>
	<c:forEach items="${menu.items}" var="item">
		<li<c:if test="${item.active}"> class="active"</c:if>><a href="<spring:url value="${item.url}"/>">${item.title}</a>
			<c:if test="${not empty item.items}">
				<t:menu menu="${item}" />
			</c:if>
		</li>
	</c:forEach>
</ul>