using UnityEngine;

public class MouseLookPlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;      // Movement speed
    public float jumpForce = 7f;      // Jump force
    public LayerMask groundLayer;     // Layer mask for the ground
    public Transform cameraTransform; // Reference to the camera

    private Rigidbody rb;
    private bool isGrounded;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        Cursor.lockState = CursorLockMode.Locked; // Lock mouse to center (optional)
        rb.freezeRotation = true; // Prevent rotation due to physics
    }

    void Update()
    {
        HandleMovement();
        HandleRotation();
        HandleJumping();
    }

    void HandleMovement()
    {
        // Get movement input (WASD/arrow keys)
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");

        // Create direction vector based on camera view
        Vector3 inputDir = new Vector3(h, 0, v).normalized;
        Vector3 moveDir = cameraTransform.forward * v + cameraTransform.right * h;
        moveDir.y = 0;
        moveDir.Normalize();

        // Apply movement velocity while preserving Y velocity for jumping
        Vector3 velocity = new Vector3(moveDir.x * moveSpeed, rb.velocity.y, moveDir.z * moveSpeed);
        rb.velocity = velocity;
    }

    void HandleRotation()
    {
        // Rotate the player to face the mouse position
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hit, 100f, groundLayer))
        {
            Vector3 lookPoint = hit.point;
            Vector3 lookDir = lookPoint - transform.position;
            lookDir.y = 0; // Keep the rotation on the horizontal plane
            if (lookDir != Vector3.zero)
                transform.rotation = Quaternion.LookRotation(lookDir);
        }
    }

    void HandleJumping()
    {
        // Jump only if grounded
        if (Input.GetButtonDown("Jump") && IsGrounded())
        {
            rb.velocity = new Vector3(rb.velocity.x, jumpForce, rb.velocity.z);
        }
    }

    bool IsGrounded()
    {
        // Check if the player is grounded using a CheckSphere at the bottom
        return Physics.CheckSphere(transform.position + Vector3.down * 0.5f, 0.3f, groundLayer);
    }

    // Optional: Visualize ground detection with Gizmos
    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(transform.position + Vector3.down * 0.5f, 0.3f); // Draw ground check sphere
    }
}
