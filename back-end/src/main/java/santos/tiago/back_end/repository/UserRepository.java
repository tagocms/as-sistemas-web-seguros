package santos.tiago.back_end.repository;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import santos.tiago.back_end.model.User;
import santos.tiago.back_end.model.UserRole;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("INSERT INTO USERS (username, password, role) VALUES (:username, :password, :role)")
    boolean create(@Param("username") String username, @Param("password") String password, @Param("role") UserRole role);

    @Modifying
    @Query("UPDATE USERS SET role = :role WHERE username = :username")
    boolean updateUserRole(@Param("username") String username, @Param("role") UserRole role);
}
