from dataclasses import dataclass

import jwt
from .config import Config
from .exceptions import BadCredentialsException, UnableCredentialsException

import logging
logger = logging.getLogger()


@dataclass
class JsonWebToken:
    """Perform JSON Web Token (JWT) validation using PyJWT"""

    logger.info("JWT message")

    jwt_access_token: str
    auth0_issuer_url: str = f"https://{Config.AUTH0_DOMAIN}/"
    auth0_audience: str = Config.AUTH0_AUDIENCE
    algorithm: str = "RS256"
    jwks_uri: str = f"{auth0_issuer_url}.well-known/jwks.json"

    def validate(self):
        try:
            jwks_client = jwt.PyJWKClient(self.jwks_uri)
            jwt_signing_key = jwks_client.get_signing_key_from_jwt(
                self.jwt_access_token
            ).key
            payload = jwt.decode(
                self.jwt_access_token,
                jwt_signing_key,
                algorithms=self.algorithm,
                audience=self.auth0_audience,
                issuer=self.auth0_issuer_url,
            )
        except jwt.exceptions.PyJWKClientError:
            raise UnableCredentialsException
        except jwt.exceptions.InvalidTokenError:
            raise BadCredentialsException
        return payload
