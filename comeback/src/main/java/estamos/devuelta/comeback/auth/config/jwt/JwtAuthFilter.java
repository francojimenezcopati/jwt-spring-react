package estamos.devuelta.comeback.auth.config.jwt;

import estamos.devuelta.comeback.appuser.AppUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
	private final JwtService jwtService;
	private final AppUserService appUserService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (request.getServletPath().contains("/api/v1/auth")) {
			filterChain.doFilter(request, response);
			return;
		}

		String authHeader = request.getHeader("Authorization");
		String accessToken = null;
		String userEmail = null;

		// chequeo que en los headers, este el de auth con Bearer (token)
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			accessToken = authHeader.substring(7);
			// Acá ya se valida el token si o si por extraer los Claims.
			userEmail = this.jwtService.extractEmail(accessToken);
		}

		// chequeo que no este autenticado de antes, xq sino lo hago al pedo
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.appUserService.loadUserByUsername(userEmail);

			if (this.jwtService.isTokenValid(accessToken, userDetails)) { // valido el token de la request

				// Procedo a establecer que el usuario que hizo la request esta ahora autenticado (y como es
				// STATELESS, solo esta autenticado durante esta request)
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());

				// le hago saber al authToken los detalles de la request
				authToken.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
				);
				// Actualizo el Security Context
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}

		filterChain.doFilter(request, response);
	}
}
