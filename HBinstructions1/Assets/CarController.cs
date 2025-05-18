using UnityEngine;

public class CarController : MonoBehaviour
{
    public GameObject player;
    public GameObject playerCamera;
    public GameObject carCamera;
    public GameObject carModel;
    public Transform exitPoint;

    private bool isInCar = false;
    private bool isPlayerNearby = false;

    void Update()
    {
        if (isPlayerNearby && Input.GetKeyDown(KeyCode.E) && !isInCar)
        {
            EnterCar();
        }
        else if (isInCar && Input.GetKeyDown(KeyCode.E))
        {
            ExitCar();
        }
    }

    public void ShowEnterPrompt(bool state)
    {
        isPlayerNearby = state;
        // Optional: enable/disable on-screen message here
    }

    void EnterCar()
    {
        isInCar = true;

        // Hide player and disable control
        player.SetActive(false);

        // Enable car control script
        GetComponent<YourCarMovementScript>().enabled = true;

        // Switch camera
        playerCamera.SetActive(false);
        carCamera.SetActive(true);
    }

    void ExitCar()
    {
        isInCar = false;

        // Move player to exit point
        player.transform.position = exitPoint.position;
        player.SetActive(true);

        // Disable car control
        GetComponent<YourCarMovementScript>().enabled = false;

        // Switch camera
        carCamera.SetActive(false);
        playerCamera.SetActive(true);
    }
}
