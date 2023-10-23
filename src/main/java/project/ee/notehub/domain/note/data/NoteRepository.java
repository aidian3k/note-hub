package project.ee.notehub.domain.note.data;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.ee.notehub.domain.note.entity.Note;

@Repository
@Transactional
interface NoteRepository extends JpaRepository<Note, Long> {
	Optional<Note> findByTitleAndUserId(String title, String userId);
	List<Note> findAllByUserId(String userId);
    Optional<Note> findByIdAndUserId(Long noteId, String userId);
}
